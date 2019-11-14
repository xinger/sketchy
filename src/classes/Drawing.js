import AnimationFrame from '@/classes/AnimationFrame';

class Line {
    constructor({points = [], style = {}}) {
        this.points = points;

        this.pointsLength = points.length;

        this.style = Object.assign({}, style);
    }

    addPoint(xy) {
        this.points.push(xy);
        this.pointsLength++;
    }

    getPoint(n) {
        return this.points[n];
    }

    getPointsLength() {
        return this.pointsLength;
    }

    toData() {
        return {
            points: this.points,
            style: this.style
        };
    }
}

class Drawing {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;

        this.resizeScene();

        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        this.ctx.shadowBlur = 10;
        // this.ctx.shadowColor = 'rgb(0, 0, 0)';

        this.isDrawing = false;
        this.lines = [];
        this.line = null;

        this.lineStyle = {
            thickness: 3,
            color: 'rgba(0,0,0,1)'
        };

        this.raf = new AnimationFrame(this.updateScene.bind(this));

        /** Bind events */
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        window.onmouseup = this.mouseUpHandler.bind(this);
        window.onresize = this.windowResizeHandler.bind(this);
    }

    /**
     * Handlers
     */
    mouseDownHandler(e) {
        this.isDrawing = true;

        this.line = new Line({
            style: this.lineStyle
        });

        this.line.addPoint([e.clientX, e.clientY]);

        this.lines.push(this.line);

        this.raf.start();

        if (this.config.events.start) {
            this.config.events.start();
        }
    }

    mouseMoveHandler(e) {
        if (!this.isDrawing) return;

        this.line.addPoint([e.clientX, e.clientY]);
    }

    mouseUpHandler(e) {
        if (!this.isDrawing) return;

        this.raf.stop();
        this.isDrawing = false;

        this.line = null;

        if (this.config.events.stop) {
            this.config.events.stop();
        }
    }

    windowResizeHandler() {
        this.resizeScene();
        this.updateScene();
    }

    /**
     * Canvas functions
     */
    clearScene() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawLine(line) {
        let p1 = line.getPoint(0);
        let p2 = line.getPoint(1);

        if (!p1) return;

        this.ctx.beginPath();
        this.ctx.moveTo(p1[0], p1[1]);

        for (let i = 1, len = line.getPointsLength(); i < len; i++) {
            let midPoint = this.midPointBtw(p1, p2);

            this.ctx.quadraticCurveTo(p1[0], p1[1], midPoint[0], midPoint[1]);

            p1 = line.getPoint(i);
            p2 = line.getPoint(i + 1);
        }

        this.ctx.lineTo(p1[0], p1[1]);
        this.ctx.stroke();

        p1 = null;
        p2 = null;
    }

    resizeScene() {
        let rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    updateScene() {
        this.clearScene();

        this.lines.forEach((line) => {
            /** Set line styles */
            this.ctx.lineWidth = line.style.thickness;
            this.ctx.strokeStyle = line.style.color;
            this.drawLine(line);
        });
    }

    thickness(val) {
        this.lineStyle.thickness = val;
        this.updateScene();
    }

    color(val) {
        this.lineStyle.color = val;
        this.updateScene();
    }

    /**
     * Helpers
     */
    midPointBtw(p1, p2) {
        return [
            p1[0] + (p2[0] - p1[0]) / 2,
            p1[1] + (p2[1] - p1[1]) / 2
        ];
    }
}

export default Drawing