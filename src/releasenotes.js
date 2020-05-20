const electron = require('electron')
const remote = electron.remote
const BrowserWindow = electron.remote.BrowserWindow
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
    window.minimize()
})
