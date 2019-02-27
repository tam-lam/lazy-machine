const electron = require('electron')
const { app, BrowserWindow } = require('electron')

function createWindow () {

  let win = new BrowserWindow({
        width: 450, 
        height: 302,
        resizable: false,
        fullscreenable: false,
        frame: false,
        backgroundColor: '#000000'
    })
  win.setMenuBarVisibility(false)
  win.loadFile('index.html')
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
   app.quit()
  })