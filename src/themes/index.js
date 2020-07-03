const themes = {
  light: {
    '--app-bg': 'rgba(255, 255, 255, 1)',
    '--text': 'rgba(0, 0, 0, 1)',
    '--border-default': 'rgba(0, 0, 0, 0)',
    '--border-hover': 'rgba(0, 0, 0, 0.1)',
    '--panel-bg': 'rgba(255, 255, 255, 0.9)',
    '--border': 'rgba(0, 0, 0, 0.1)',
    '--slider-thumb': 'rgba(0, 0, 0, 1)',

    '--color-1': 'rgba(0, 0, 0, 1)',
    '--color-2': 'rgba(242, 95, 92, 1)',
    '--color-3': 'rgba(255, 224, 102, 1)',
    '--color-4': 'rgba(36, 123, 160, 1)',
    '--color-5': 'rgba(12, 193, 179, 1)',
    '--color-6': 'rgba(255, 255, 255, 1)',
  },

  dark: {
    '--app-bg': 'rgba(53, 53, 53, 1)',
    '--text': 'rgba(230, 230, 230, 1)',
    '--border-default': 'rgba(255, 255, 255, 0)',
    '--border-hover': 'rgba(255, 255, 255, 0.1)',
    '--panel-bg': 'rgba(53, 53, 53, 0.9)',
    '--border': 'rgba(255, 255, 255, 0.1)',
    '--slider-thumb': 'rgba(230, 230, 230, 1)',

    '--color-1': 'rgba(230, 230, 230, 1)',
    '--color-2': 'rgba(242, 95, 92, 1)',
    '--color-3': 'rgba(255, 224, 102, 1)',
    '--color-4': 'rgba(36, 123, 160, 1)',
    '--color-5': 'rgba(12, 193, 179, 1)',
    '--color-6': 'rgba(0, 0, 0, 1)',
  }
};


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
