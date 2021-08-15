"use strict";

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain;

function createWindows() {
  var welcomeWindow = new BrowserWindow({
    width: 600,
    height: 400,
    center: true,
    backgroundColor: '#2f78f9',
    webPreferences: {
      nodeIntegration: true
    },
    hasShadow: true,
    darkTheme: true,
    resizable: true,
    moveable: true,
    minimizable: true,
    maximizable: true,
    fullscreen: false,
    fullscreenable: false,
    frame: false,
    transparent: false,
    minWidth: 800,
    show: false,
    alwaysOnTop: true
  });
  welcomeWindow.loadFile('./public/index.html');
  welcomeWindow.on('closed', function () {
    welcomeWindow = null;
  });
  var dashboardWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    x: 0,
    y: 0,
    resizable: true,
    moveable: true,
    minimizable: true,
    maximizable: true,
    kiosk: true,
    fullscreenable: true,
    frame: true,
    transparent: false,
    show: false
  });
  dashboardWindow.loadFile('./public/dashboard.html');
  welcomeWindow.once('ready-to-show', function () {
    dashboardWindow.show();
    dashboardWindow.maximize();
    setTimeout(function () {
      welcomeWindow.show();
    }, 1000);
  });
  dashboardWindow.on('closed', function () {
    dashboardWindow = null;
  });
  ipcMain.on('closeWelcomeWindow', function (event) {
    welcomeWindow.hide();
  });
}

app.on('ready', createWindows);