// @ts-nocheck

import React, { Component } from 'react'

import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import dva from './dva'
import models from './models'

import './app.less'

require('promise-prototype-finally')

const dvaApp = dva.createApp({
  initialState: {},
  enableLog: false,
  models,
})

const store = dvaApp.getStore()

class App extends Component {

  componentDidMount() {
    if (typeof Taro.getUpdateManagera === "function" && Taro.getUpdateManager) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        console.log(`${res.hasUpdate ? '有' : '没有'}新版本`,)
      })
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: (res) => {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新的版本下载失败
      })
    }
  }

  render() {

    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
