import themes from './themes.json';

/**
 * A class that handles themes
 */
class Themes {
  /**
   * Inits first theme
   * @returns {void}
   */
  constructor() {
    this.activeTheme = 'light';
  }

  set(theme) {
    for (const prop in themes[theme]) {
      document.documentElement.style.setProperty(prop, themes[theme][prop]);
    }
  }
}

export default new Themes();
