const { BrowserWindow, app } =require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    alwaysOnTop: true,
  })
  win.loadURL('http://localhost:5173/')
//   win.loadFile('playground.html')
  return win
}

app.whenReady().then(() => {
  createWindow()
})