import { BrowserWindow, app, ipcMain } from 'electron'
import { join } from 'node:path'
const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    alwaysOnTop: true,
    webPreferences:{
      preload: join(__dirname, '../preload/index.js'),
      sandbox:false
    }
  })
  win.webContents.openDevTools()
  win.loadFile(join(__dirname, '../renderer/index.html'))
  return win
}
app.whenReady().then(() => {
  createWindow()
  ipcMain.on('setTitle', (event, title) => {
    //获取用于控制网页的webContents对象
    const webContents = event.sender
    //获取窗口
    const win = BrowserWindow.fromWebContents(webContents)
    //设置窗口标题
    win!.setTitle(title)
  })
})