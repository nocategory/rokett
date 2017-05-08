/* eslint global-require: 1, flowtype-errors/show-errors: 0 */
// @flow
import { app, BrowserWindow } from 'electron';
import windowStateKeeper from 'electron-window-state';
import autoUpdater from './autoUpdater';
import MenuBuilder from './menu';

require('electron-debug')({ enabled: true, showDevTools: true });

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }
  if (process.env.NODE_ENV === 'production') {
    await autoUpdater();
  }

  // Load the previous state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1366,
    defaultHeight: 768,
  });

  if (process.env.NODE_ENV === 'development') {
	  mainWindow = new BrowserWindow({
  		backgroundColor: '#2e2c29',
  		x: mainWindowState.x,
  		y: mainWindowState.y,
  		width: mainWindowState.width,
  		height: mainWindowState.height,
  		frame: false,
  		resizable: true,
  		show: false,
  		webPreferences: { webSecurity: false }
	  });
  }

  if (process.env.NODE_ENV === 'production') {
	  mainWindow = new BrowserWindow({
  		backgroundColor: '#2e2c29',
  		x: mainWindowState.x,
  		y: mainWindowState.y,
  		width: mainWindowState.width,
  		height: mainWindowState.height,
  		frame: false,
  		resizable: true,
  		show: false,
  		webPreferences: { webSecurity: true }
	  });
  }

  const url = (process.env.NODE_ENV === 'development')
    ? `http://localhost:${process.env.PORT || 1212}/dist/app.html`
    : `file://${__dirname}/dist/app.html`;
  mainWindow.loadURL(url);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    // mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
