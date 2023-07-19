import { BrowserWindow, ipcMain } from 'electron';
//获取触发事件的窗口对象
const getWin = (event: Electron.IpcMainEvent) => {
  return BrowserWindow.fromWebContents(event.sender)!
}

ipcMain.on(
  'setWindowMaxSize',
  (event: Electron.IpcMainEvent, opt: { width: number; height: number }) => {
    const win = getWin(event)
    win.setMaximumSize(opt.width,opt.height)
  }
)