const electron = require('electron')
const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
        width: 450, 
        height: 295,
        resizable: false,
        fullscreenable: false,
        // transparent: true,
        // vibrancy:'ultra-dark',
        backgroundColor: '#000000'
    })
  win.setMenuBarVisibility(false)
  win.loadFile('index.html')
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
   app.quit()
  })