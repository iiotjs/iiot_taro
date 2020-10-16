import Taro from '@tarojs/taro';

let base = 'develop' // 区分storage 环境

const obj = Taro.getAccountInfoSync()
if (obj.miniProgram) {
  switch (obj.miniProgram.envVersion) {
    case 'develop': {
      base = 'develop'
      break
    }

    case 'trial': {
      base = 'trial'
      break
    }

    case 'release': {
      base = 'release'
      break
    }

    default: {
      base = 'develop'
      break
    }
  }
}

export function getStorage(key) {
  return Taro.getStorageSync(`${base}-${key}`)
}

export function setStorage(key, Storage) {
  return Taro.setStorageSync(`${base}-${key}`, Storage)
}

export function removeStorage(key) {
  return Taro.removeStorageSync(`${base}-${key}`)
}

export function removeAllStorage() {
  return Taro.clearStorage()
}
