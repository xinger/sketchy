import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([ {
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true,
  },
} ]);

function createWindow() {
  // Create the browser window.
  console.log(__dirname);
  win = new BrowserWindow({
    title: 'Sketchy',
    titleBarStyle: 'hidden',
    width: 800,
    height: 1000,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      icon: path.join(__dirname, '/../build/icon.icns'),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/main');
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html/#/main');
  }

  win.on('closed', () => {
    win = null;
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
  if (win === null) {
    createWindow();
  }
});

app.on('ready', async () => {
  createWindow();

  ipcMain.on('open-new-window', (event, params) => {
    createWindow();
  });
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
