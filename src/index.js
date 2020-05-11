const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
//const axios = require('axios')
const ipc = electron.ipcRenderer
const shell = require('electron').shell
//const ks = require('node-key-sender')
const remote = electron.remote
const os = require('os')


var homedir = os.homedir()

const closeBtn = document.getElementById('closeBtn')

var requestSomething = "https://aristocratprod.service-now.com/ess/requestsomething.do?catalog=it"
var getHelp = "https://aristocratprod.service-now.com/ess/get_help.do"
var myApps = "https://aristocrat.okta.com/app/UserHome"
var email = "mailto:servicedesk@aristocrat.com"
var kb = "https://aristocratprod.service-now.com/ess/$knowledge.do"
var zoom = homedir + "\\AppData\\Roaming\\Zoom\\bin\\Zoom.exe"
var smartbar = "https://aristocrat.zoom.us/my/virtualsmartbar"
var globalprotect = "C:\\Program Files\\Palo Alto Networks\\GlobalProtect\\PanGPA.exe"

var mousetrap = require('mousetrap')

mousetrap.bind('ctrl+shift+i', function() {
  var window = remote.getCurrentWindow();
  window.webContents.openDevTools()
});

function externalApp(path){

        var execFile = require('child_process').execFile, child;
         child = execFile(path, function(error,stdout,stderr) {
            if (error) {
              //console.log(error.stack);
              //console.log('Error code: '+ error.code);
              //console.log('Signal received: '+
              //       error.signal);
              }
              //console.log('Child Process stdout: '+ stdout);
              //console.log('Child Process stderr: '+ stderr);
          });
};

toolsBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'tools.html')
    let win = new BrowserWindow({ webPreferences: {
                nodeIntegration: true
            }, frame: false, width: 600, height: 361})
    //win.webContents.openDevTools()
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

callBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'callservicedesk.html')
    let win = new BrowserWindow({ webPreferences: {
                nodeIntegration: true
            }, frame: false, width: 400, height: 412})
    //win.webContents.openDevTools()
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

emailBtn.addEventListener('click', function(event) {
    shell.openExternal(email)
})

requestBtn.addEventListener('click', function(event) {
    shell.openExternal(requestSomething)
})

kbBtn.addEventListener('click', function(event) {
    shell.openExternal(kb)
})

myAppsBtn.addEventListener('click', function(event) {
    shell.openExternal(myApps)
})

getHelpBtn.addEventListener('click', function(event) {
    shell.openExternal(getHelp)
})

gpBtn.addEventListener('click', function(event) {
    externalApp(globalprotect)
})

zoomBtn.addEventListener('click', function(event) {
    //shell.openExternal(zoom)
    shell.openExternal(smartbar)
})

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

minBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.minimize()
})



/*const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = '$'+cryptos.toLocaleString('en')

            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
                const myNotification = new window.Notification(notification.title, notification)
            }

        })
}
getBTC()
setInterval(getBTC, 10000);

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ webPreferences: {
                nodeIntegration: true
            },frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 })
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en')
})*/
