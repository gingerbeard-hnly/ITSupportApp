const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;
const log = require('electron-log');
const {autoUpdater} = require('electron-updater');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  })
  autoUpdater.on('update-available', (info) => {
    console.log('Update available.');
  })
  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.');
  })
  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater. ' + err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded');
  });


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ webPreferences: {
              nodeIntegration: true
          },frame: false, width: 750, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }




  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

/*  var menu = Menu.buildFromTemplate([
      {
          label: 'Menu',
          submenu: [
                {label: 'Adjust Notification Value'},
                {
                    label: 'CoinMarketCap',
                    click() {
                        shell.openExternal('http://coinmarketcap.com')
                    }
                },
                {type: 'separator'},
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
          ]
      },
      {
          label: 'Info'
      }
  ])

  Menu.setApplicationMenu(menu);*/
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  autoUpdater.checkForUpdatesAndNotify();
  if (win === null) {
    createWindow()
  }
})

/*ipc.on('update-notify-value', function(event, arg) {
  win.webContents.send('targetPriceVal', arg)
})*/
