import * as d3 from 'd3';

class Drawing {
  constructor(svgContainer, config) {
    this.svgContainer = svgContainer;
    this.config = config;

    /**
     * Styles of the line
     * @type {{color: string, thickness: number}}
     */
    this.lineStyle = {
      'fill': 'none',
      'stroke': '#f0f',
      'stroke-width': '3px',
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round',
      'stroke-dasharray': '0',
    };

    /**
     * D3 line definition
     */
    this.line = d3.line();
    this.line.curve(d3.curveBasis);

    /**
     * Make svg draggable
     */
    this.svg = d3.select('#svg');
    this.svg.call(d3.drag()
      .container(function () {
        return this;
      })
      .subject(function () {
        const p = [d3.event.x, d3.event.y];

        return [p, p];
      })
      .on('start', this.dragStartHandler.bind(this))
      .on('end', this.dragEndHandler.bind(this))
    );

    this.history = [];
  }

  /**
   * Drag start handler
   * @returns {void}
   */
  dragStartHandler() {
    const d = d3.event.subject;
    const active = this.svg.append('path').datum(d);
    let x0 = d3.event.x;
    let y0 = d3.event.y;

    this.setLineAttrs(active);

    this.history.push(active);

    d3.event.on('drag', () => {
      const x1 = d3.event.x;
      const y1 = d3.event.y;
      const dx = x1 - x0;
      const dy = y1 - y0;

      if (dx * dx + dy * dy > 5) {
        d.push([x0 = x1, y0 = y1]);
      } else {
        d[d.length - 1] = [x1, y1];
      }

      active.attr('d', this.line);
    });

    if (this.config.events.start) {
      this.config.events.start();
    }
  }

  /**
   * Drag end handler
   * @returns {void}
   */
  dragEndHandler() {
    if (this.config.events.stop) {
      this.config.events.stop();
    }
  }

  /**
   * Set line attributes
   * @param {object} line – d3 line
   * @returns {void}
   */
  setLineAttrs(line) {
    Object.keys(this.lineStyle).forEach(key => {
      line.attr(key, this.lineStyle[key]);
    });
  }

  /**
   * Thickness of the line
   * @param {number} val – line thickness
   * @returns {void}
   */
  thickness(val) {
    this.lineStyle['stroke-width'] = `${val}px`;
  }

  /**
   * Color of the line
   * @param {string} val – line color
   * @returns {void}
   */
  color(val) {
    this.lineStyle.stroke = val;
  }

  /**
   * Dashed property of the line
   * @param {number} val – dashed value
   * @returns {void}
   */
  dashed(val) {
    this.lineStyle['stroke-dasharray'] = val * parseInt(this.lineStyle['stroke-width']);
  }

  /**
   * Undo action
   * @returns {void}
   */
  undo() {
    if (this.history.length > 0) {
      this.history.splice(-1)[0].remove();
    }
  }

  /**
   * Append image to svg
   * @param {strong} imageFilePath – image file path
   * @returns {void}
   */
  setImage(imageFilePath) {
    let image = this.svg.select('image');

    if (image.empty()) {
      image = this.svg.append('image');
    }

    image.attr('xlink:href', imageFilePath)
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%');
  }
}

export default Drawing;
