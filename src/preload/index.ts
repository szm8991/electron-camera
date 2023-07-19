/// <reference types="./index.d.ts" />
import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const api = {
  quit: () => {
    ipcRenderer.send('quit')
  },
  drag: (opt: { x: number; y: number }) => {
    ipcRenderer.invoke('drag', opt)
  },
  setWindowSize: (opt: any) => {
    ipcRenderer.send('setWindowSize', opt)
  },
  setWindowMaxSize: (opt: { width: number; height: number }) =>{
    ipcRenderer.send('setWindowMaxSize', opt)

  }
}
console.log(process.contextIsolated)

if (process.contextIsolated) {
  try {
    // 为渲染进程暴露API
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}