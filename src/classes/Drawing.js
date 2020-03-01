import AnimationFrame from '@/classes/AnimationFrame';
import * as d3 from 'd3';

class Drawing {
  constructor(svgContainer, config) {
    this.svgContainer = svgContainer;
    this.config = config;

    /**
     * Styles of the line
     *
     * @type {{color: string, thickness: number}}
     */
    this.lineStyle = {
      'fill': 'none',
      'stroke': '#f0f',
      'stroke-width': '3px',
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round',
      'stroke-dasharray': '0'
    };

    /**
     * D3 line definition
     */
    this.line = d3.line();
    this.line.curve(d3.curveBasis);

    /**
     * Make svg draggable
     *
     * @type {void | Selection | Transition | string}
     */
    this.svg = d3.select('#svg');
    this.svg.call(d3.drag()
      .container((function () {
        return this
      }))
      .subject(function () {
        let p = [d3.event.x, d3.event.y];
        return [p, p]
      })
      .on("start", this.dragStartHandler.bind(this))
      .on("end", this.dragEndHandler.bind(this))
    );

    this.history = [];
  }

  /**
   * Handlers
   */
  dragStartHandler() {
    let d = d3.event.subject,
      active = this.svg.append("path").datum(d),
      x0 = d3.event.x,
      y0 = d3.event.y;

    this.setLineAttrs(active);

    this.history.push(active);

    d3.event.on("drag", () => {
      let x1 = d3.event.x,
        y1 = d3.event.y,
        dx = x1 - x0,
        dy = y1 - y0;

      if (dx * dx + dy * dy > 50) {
        d.push([x0 = x1, y0 = y1])
      } else {
        d[d.length - 1] = [x1, y1]
      }

      active.attr("d", this.line);
    });

    if (this.config.events.start) {
      this.config.events.start();
    }
  }

  dragEndHandler() {
    if (this.config.events.stop) {
      this.config.events.stop();
    }
  }

  setLineAttrs(line) {
    Object.keys(this.lineStyle).forEach(key => {
      line.attr(key, this.lineStyle[key]);
    });
  }

  thickness(val) {
    this.lineStyle['stroke-width'] = `${val}px`
  }

  color(val) {
    this.lineStyle['stroke'] = val;
  }

  dashed(val) {
    this.lineStyle['stroke-dasharray'] = val * parseInt(this.lineStyle['stroke-width']);
  }

  undo() {
    if (this.history.length > 0) {
      this.history.splice(-1)[0].remove();
    }
  }
}

export default Drawing
