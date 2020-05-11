const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
var os = require('os')
const si = require('systeminformation')

function toSTDtime(seconds){
  days = Math.floor(seconds / 86400)
  seconds = seconds - days * 86400
  hours = Math.floor(seconds / 3600 )
  seconds = seconds - hours * 3600
  minutes = Math.floor(seconds / 60)
  seconds = Math.floor(seconds - minutes * 60)

  return days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds"
}

var mousetrap = require('mousetrap')
mousetrap.bind('ctrl+shift+i', function() {
  var window = remote.getCurrentWindow();
  window.webContents.openDevTools()
});

function convertOS(os, version){

  switch (os) {
    case 'Windows_NT':
        os = "Windows"
      break;
    case 'Linux':
        os = "Linux"
      break;
    case 'Darwin':
        os = "Mac OSX"
      break;
  }

  if(os=='Windows'){

    if(version.startsWith('10')){
      version = "10"
    }
  }

  return os + " " + version
}

function osBuild(release){

  //release = release.replace("10.0.", "")

  switch (release) {
    case "10.0.18363":
      build = "1909"
      break;
    case "10.0.18362":
      build = "1903"
      break;
    case "10.0.17763":
      build = "1809"
      break;
    case "10.0.17134":
      build = "1803"
      break;
    case "10.0.16299":
      build = "1709"
      break;
    case "10.0.15063":
      build = "1703"
      break;
    default: "Unknown"

  }

  return build
}


//document.getElementById('os').innerHTML = "Platform: " + os.platform()
//console.log("Architecture: " + os.arch());

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close()
})

minBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.minimize()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function() {
    //ipc.send('update-notify-value', document.getElementById('notifyVal').value)
    //document.getElementById('os') = 'test';
    //var window = remote.getCurrentWindow();
    //window.Update()
    UpdateSysInfo();
})

UpdateSysInfo();

function UpdateSysInfo(){

  var sysUp = toSTDtime(os.uptime())
  var newOS = convertOS(os.type(),os.release())

  document.getElementById("IP").innerHTML = getLocalIP();
  document.getElementById("uptime").innerHTML = sysUp;
  document.getElementById("hostname").innerHTML = os.hostname();
  document.getElementById("type").innerHTML = newOS
  document.getElementById("arch").innerHTML = os.arch();
  document.getElementById("username").innerHTML = os.userInfo().username;

  si.osInfo(function(data) {

    document.getElementById("build").innerHTML = data.build

  })

  si.system(function(data) {

    document.getElementById("manufacturer").innerHTML = data.manufacturer

      var manu = data.manufacturer

      if(manu.startsWith('LENOVO'))
      {
        document.getElementById("model").innerHTML = data.version
      }
      else
      {
        document.getElementById("model").innerHTML = data.model
      }

    document.getElementById("serial").innerHTML = data.serial

  })

}

function getLocalIP() {
 const interfaces = os.networkInterfaces();
 const addresses = [];
 var ipAddress;

 Object.keys(interfaces).forEach((netInterface) => {
  interfaces[netInterface].forEach((interfaceObject) => {
   if (interfaceObject.family === 'IPv4' && !interfaceObject.internal) {

     if (addresses.length >= '1') {
       ipAddress = "<br>" + interfaceObject.address
       console.log(ipAddress)
     } else {
console.log(addresses.length)
       ipAddress = interfaceObject.address
     }

    addresses.push(ipAddress);
   }
  });
 });
 return addresses;
}
