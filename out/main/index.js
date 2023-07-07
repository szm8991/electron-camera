"use strict";
const electron = require("electron");
const node_path = require("node:path");
const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: 600,
    height: 600,
    alwaysOnTop: true
  });
  win.loadFile(node_path.join(__dirname, "../renderer/index.html"));
  return win;
};
electron.app.whenReady().then(() => {
  createWindow();
});
