import Taro from '@tarojs/taro'

const baseUrlStr = 'https://iot.zhize.com.cn'
let baseUrlPrefix = ''

const obj = Taro.getAccountInfoSync()
if (obj.miniProgram) {
  switch (obj.miniProgram.envVersion) {
    case 'develop': {
      baseUrlPrefix = '/sandbox'
      break
    }

    case 'trial': {
      baseUrlPrefix = '/sandbox'
      break
    }

    case 'release': {
      baseUrlPrefix = ''
      break
    }

    default: {
      baseUrlPrefix = ''
      break
    }
  }
}

export const baseUrl = `${baseUrlStr}${baseUrlPrefix}`

// 输出日志信息
export const noConsole = true;