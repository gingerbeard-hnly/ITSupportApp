const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer
const shell = require('electron').shell
const remote = electron.remote
const os = require('os')

var mousetrap = require('mousetrap')
mousetrap.bind('ctrl+shift+i', function() {
  var window = remote.getCurrentWindow();
  window.webContents.openDevTools()
});

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

minBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.webContents.openDevTools()
    window.minimize()
})
