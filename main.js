const electron = require('electron')
const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
        width: 450, 
        height: 270,
        titleBarStyle: 'hidden',
        resizable: false,
        fullscreenable: false,
        // backgroundColor: "#F7C136",
        vibrancy: 'ultra-dark'
    })

  win.loadFile('index.html')
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
   app.quit()
  })