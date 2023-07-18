import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'node:path'
import './quit'
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 200,
    alwaysOnTop: true,
    autoHideMenuBar:true,
    transparent:true,
    show:false,
    frame:false,
    skipTaskbar: false,
    webPreferences:{
      preload: join(__dirname, '../preload/index.js'),
      //关闭沙盒模式
      sandbox:false
    }
  })
  
  console.log(process)

  if (is.dev) mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  
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