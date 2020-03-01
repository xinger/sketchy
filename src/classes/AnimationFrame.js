/* eslint-disable require-jsdoc, no-magic-numbers, camelcase, valid-jsdoc, no-debugger */

class AnimationFrame {
  constructor(func) {
    this.raf = null;
    this.current_state = false;
    this.func = func.bind(this);
  }

  loop() {
    this.raf = requestAnimationFrame(this.loop.bind(this));
    this.func();
  };

  start() {
    if (this.current_state === false) {
      this.current_state = true;
      this.raf = requestAnimationFrame(this.loop.bind(this));
    }
  };

  stop() {
    if (this.current_state === true) {
      this.current_state = false;
      cancelAnimationFrame(this.raf);
    }
  };

  state() {
    return this.current_state;
  };
}

export default AnimationFrame;
