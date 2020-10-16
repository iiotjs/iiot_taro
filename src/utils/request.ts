/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-else-return */
/* eslint-disable no-console */

import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '@/config/base';
import { getStorage, removeAllStorage } from '@/utils/storage'

import { FormatTime } from '@/utils/utils'

import PackageJson from '@/package'

interface IOptions {
  method: keyof IMethod,
  url?: string,
  data?: object
}

/** HTTP 请求方法 */
interface IMethod {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}

/**
 *
 * @param {string} name 错误名字
 * @param {string} action 错误动作描述
 * @param {string} info 错误信息，通常是 fail 返回的
 */
// eslint-disable-next-line
export const logError = (name: string, action: string, info?: string | object) => {
  if (!info) {
    info = 'empty'
  }
  const time = FormatTime(new Date())
  console.error(time, name, action, info)
  if (typeof info === 'object') {
    info = JSON.stringify(info)
  }
}

const request_data = {
  version: PackageJson.version,
}



function request<T>(options: IOptions = { method: 'POST' }): Promise<T> {
  const token = {
    token: getStorage('t') || 'token'
  }

  const interceptor = (chain) => {

    const { requestParams } = chain
    const { method, data, url } = requestParams

    if (!noConsole) {
      console.log(`http ${method || 'GET'} --> ${url} data: `, data)
    }

    return chain.proceed(requestParams)
      .then(res => {
        if (!noConsole) {
          console.log(`https <-- ${url} 返回数据:`, res.data)
        }
        return res
      })
  }

  Taro.addInterceptor(interceptor)

  return new Promise((resolve: any, reject: string | any) => {
    Taro.request({
      url: `${baseUrl}${options.url}`,
      data: {
        ...request_data,
        ...options.data,
      },
      header: {
        'Content-Type': 'application/json',
        ...token
      },
      method: options.method,
    }).then(async res => {
      const { statusCode, data } = res;
      if (statusCode >= 200 && statusCode < 300) {
        return resolve(data)
      }

      // Taro.hideToast()
      // Taro.hideLoading()

      if (statusCode === 400) {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
        });

        if (res.data.msg === '解码失败') {
          return reject()
        }
        logError('400', res.data.msg)
        return reject()
      } else if (statusCode === 401) {
        if (res.data.msg) {
          Taro.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
          });
          logError('401', res.data.msg)
          return reject(res.data.msg)
        }
        Taro.showToast({
          title: '登录过期',
          icon: 'none',
          mask: true,
        });

        removeAllStorage()
        Taro.redirectTo({ url: '/pages/login/index' })
        logError('401', '登录过期')
        return reject('登录过期')

      } else if (statusCode === 403) {
        Taro.showToast({
          title: '没有操作权限',
          icon: 'none',
          mask: true,
        });
        logError('403', '登没有操作权限录过期')
        return reject('没有操作权限')
      } else if (statusCode === 501) {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
        });
        logError('501', res.data.msg)
        return reject(res.data.msg)
      } else {
        Taro.showToast({
          title: '请求失败',
          icon: 'none',
          mask: true,
        });
        logError(`网络请求错误，状态码${statusCode}`, '请求失败')
        return reject('请求失败')
      }
      // throw new Error(`网络请求错误，状态码${statusCode}`);
    }).catch(() => {
      return reject()
    })
  })
}

export default request