const {remote, ipcRenderer} = require('electron')
const ElectronTitlebarWindows = require('electron-titlebar-windows');

const titlebar = new ElectronTitlebarWindows({
  fullscreen: true,
  draggable :true,
});
titlebar.appendTo()
titlebar.on('close', function(e) {
  remote.app.quit();
});
titlebar.on('minimize', function(e) {
  remote.getCurrentWindow().minimize()
});
titlebar.on('maximize', function(e) {
});
titlebar.on('fullscreen', function(e) {
});