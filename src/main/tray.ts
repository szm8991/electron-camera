import { Menu, shell, Tray } from 'electron'
import path from 'path'
const createTray = () => {
  const tray = new Tray(
    path.resolve(
      __dirname,
      process.platform == 'darwin'
        ? '../../resources/trayTemplate@2x.png'
        : '../../resources/windowTray.png'
    )
  )
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', role: 'quit' },
    { label: '参考', click: () => shell.openExternal('https://www.houdunren.com') }
  ])
  tray.setToolTip('electron摄像头')
  tray.setContextMenu(contextMenu)
}

export default createTray