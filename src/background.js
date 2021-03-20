import { app, protocol, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([ {
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true,
  },
} ]);

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Sketchy',
    titleBarStyle: 'hidden',
    width: 800,
    height: 600,
    backgroundColor: getTheme() === 'light' ? '#ffffff' : '#353535',
    webPreferences: {
      nodeIntegration: true,
      icon: path.join(__dirname, '/../build/icon.icns'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/main');
    if (!process.env.IS_TEST) {
      mainWindow.webContents.openDevTools();
    }
  } else {
    createProtocol('app');
    mainWindow.loadURL('app://./index.html/#/main');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const { Menu, MenuItem } = require('electron');
  const menu = new Menu();

  menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: () => {
      console.log('time to print stuff');
    },
  }));

  menu.append(new MenuItem({
    label: 'File',
    accelerator: 'CmdOrCtrl+N',
    click: () => {
      console.log('time to print stuff');
    },
  }));
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('ready', async () => {
  createWindow();

  ipcMain.on('open-new-window', (event, params) => {
    createWindow();
  });
});

/**
 * Get OS theme
 * @return {string}
 */
function getTheme() {
  return nativeTheme.shouldUseDarkColors === true ? 'dark' : 'light';
}

/**
 * Handle os theme for renderer process
 */
ipcMain.handle('os-theme', (event) => {
  return getTheme();
});

/**
 * Handle os theme changed
 */
nativeTheme.on('updated', () => {
  mainWindow.webContents.send('os-theme-changed', getTheme());
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
