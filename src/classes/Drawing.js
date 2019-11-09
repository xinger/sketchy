import AnimationFrame from '@/classes/AnimationFrame';

class Line {
    constructor() {
        this.points = [];

        this.pointsLength = 0;

        this.styles = {
            thickness: 3
        }
    }

    addPoint(xy) {
        this.points.push(xy);
        this.pointsLength++;
    }

    getPoint(n) {
        this.points[n];
    }

    getPointsLength() {
        return this.pointsLength;
    }

    setThickness(val) {
        this.styles.thickness = val;
    }
}

class Drawing {
    constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;

        this.resizeScene();

        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        // this.ctx.shadowBlur = 1.2;
        // this.ctx.shadowColor = 'rgb(0, 0, 0)';

        this.isDrawing = false;
        this.points = [];
        this.lines = [];

        this.raf = new AnimationFrame(this.updateScene.bind(this));

        /** Bind events */
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    /**
     * Handlers
     */
    mouseDownHandler(e) {
        this.isDrawing = true;

        this.addPoint({
            x: e.clientX,
            y: e.clientY
        });

        this.raf.start();
    }

    mouseMoveHandler(e) {
        if (!this.isDrawing) return;

        this.addPoint({
            x: e.clientX,
            y: e.clientY
        });

        // this.drawPoints();
        // this.cutPoints();
    }

    mouseUpHandler(e) {
        this.raf.stop();
        this.isDrawing = false;
        this.clearPoints();
    }

    /**
     * Canvas functions
     */
    clearScene() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    drawPoints(points) {
        let p1 = points[0];
        let p2 = points[1];

        if (!p1) return;

        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);

        for (var i = 1, len = points.length; i < len; i++) {
            var midPoint = this.midPointBtw(p1, p2);
            this.ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
            p1 = points[i];
            p2 = points[i + 1];
        }

        this.ctx.lineTo(p1.x, p1.y);
        this.ctx.stroke();
    }

    resizeScene() {
        let rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    updateScene() {
        this.clearScene();

        this.lines.forEach((points) => {
            this.drawPoints(points);
        });

        this.drawPoints(this.points);
    }

    thickness(val) {
        this.ctx.lineWidth = val;
        this.updateScene();
    }

    /**
     * Points manipulation
     */
    addPoint(point) {
        this.points.push(point);
    }

    getPoint(n = 0) {
        return this.points[n];
    }

    clearPoints() {
        this.lines.push(this.points);
        this.points = [];
    }

    /**
     * Helpers
     */
    midPointBtw(p1, p2) {
        return {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2
        };
    }
}

export default Drawing