import { BrowserWindow, app } from 'electron'
import { join } from 'node:path'
const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    alwaysOnTop: true,
  })
  win.loadFile(join(__dirname, '../renderer/index.html'))
  return win
}

app.whenReady().then(() => {
  createWindow()
})