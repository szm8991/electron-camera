import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, Notification, app, shell } from 'electron'
import { join } from 'node:path'
import './drag'
import './maxSize'
import './quit'
import createTray from './tray'
import './windowSize'
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 320,
    maxWidth:500,
    maxHeight:320,
    show:false,
    alwaysOnTop: true,
    autoHideMenuBar:true,
    transparent:true,
    frame:false,
    skipTaskbar: true,
    webPreferences:{
      preload: join(__dirname, '../preload/index.js'),
      //关闭沙盒模式
      sandbox:false
    }
  })
  
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
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  
  createWindow()
  
  createTray()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  if (process.platform == 'darwin') app.dock.hide()
}).then(()=>{
  new Notification({
    title:'Camera通知',
    body: '联系作者：9527',
  }).show()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})