const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const printer = require('node-native-printer')

app.on('ready', () => {

  const mainWindow = new BrowserWindow({
    width: 1024,
    heigth: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyUrl'
  mainWindow.loadURL(urlLocation)

})
