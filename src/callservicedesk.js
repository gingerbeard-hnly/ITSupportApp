const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
var os = require('os')
const shell = require('electron').shell
var http = require('http');
var requestCountry = require('request-country');
//var call = "callto:servicedesk@aristocrat.com"

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

callBtn.addEventListener('click', function(event){

  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
  var call = numberfinder(Intl.DateTimeFormat().resolvedOptions().timeZone)
  shell.openExternal(call)
})

function numberfinder(loc){

  if (loc.includes('Europe'))
  {
    number = "callto:+44 1895 280 801"
  }
  else if (loc.includes('US'))
  {
    number = "callto:+1 702 270 1010"
  }
  else if (loc.includes('India'))
  {
    number = "callto:+91 120 467 7421"
  }
  else {
    number = "callto:+61 2 9013 6363"
  }


  return number
}
