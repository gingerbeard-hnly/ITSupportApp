const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
var os = require('os')
const shell = require('electron').shell


//const child = require('child_process').execFile

const closeBtn = document.getElementById('closeBtn')
const btnClose = document.getElementById('btnClose')
const sysInfoBtn = document.getElementById('sysInfoBtn')
const taskBtn = document.getElementById('taskBtn')
const taskmgrPath = "C:\\Windows\\system32\\taskmgr.exe /7"

const snippingtool  = "C:\\Windows\\system32\\SnippingTool.exe"
//const snippingtool  = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Accessories\\Snipping Tool.lnk"

var mousetrap = require('mousetrap')
mousetrap.bind('ctrl+shift+i', function() {
  var window = remote.getCurrentWindow();
  window.webContents.openDevTools()
});

function externalApp(path){

        var execFile = require('child_process').execFile, child;
         child = execFile(path, function(error,stdout,stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: '+ error.code);
              console.log('Signal received: '+
                     error.signal);
              }
              console.log('Child Process stdout: '+ stdout);
              console.log('Child Process stderr: '+ stderr);
          });
};


closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

minBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.minimize()
})

taskBtn.addEventListener('click', function(event) {

    var cp = require('child_process');
    cp.spawn('cmd', ['/C', 'start taskmgr.exe']);
})

cmdBtn.addEventListener('click', function(event) {

    openCMD()
})

screenshotBtn.addEventListener('click', function(event) {

    var cp = require('child_process');
    cp.spawn('cmd', ['/C', 'start explorer.exe ms-screenclip:']);
    //var ks = require('node-key-sender')
    //ks.sendCombination(['windows', 'shift', 's']);
    //externalApp(snippingtool)
    //var cp = require('child_process');
    //cp.spawn('cmd', ['/C', 'start /b /i "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Accessories\\Snipping Tool.lnk"']);
})

sysInfoBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'SysInfo.html')
    let win = new BrowserWindow({ webPreferences: {
                nodeIntegration: true
            },frame: false, width: 600, height: 644 })
    //win.webContents.openDevTools()
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

function openCMD (){

  var cp = require('child_process');
  cp.spawn('cmd', ['/C', 'start cmd.exe']);
}
