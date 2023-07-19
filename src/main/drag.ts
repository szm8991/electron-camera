import { BrowserWindow, ipcMain } from 'electron';

ipcMain.handle('drag', (event, opt: { x: number; y: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender)!

  // const bounds = win.getBounds();
  // bounds.x += opt.x;
  // bounds.y += opt.y;
  // win.setBounds(bounds, true);
  
  const [x, y] = win.getPosition()
  win.setPosition(x + opt.x, y + opt.y)
})