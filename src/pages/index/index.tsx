import React from 'react'
import { View } from '@tarojs/components'

import Navbar from '@/components/Navbar'
import { AtButton } from 'taro-ui'
import 'taro-ui/dist/style/components/button.scss'

import styles from './index.less'

const Index = () => {
  return (
    <View className={styles.index}>
      <Navbar title='Hello world!' />
      <AtButton type='primary'>iiot-taro</AtButton>
    </View>
  )
}

export default Index
