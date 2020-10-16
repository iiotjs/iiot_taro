import React, { FC } from 'react'
import { View } from '@tarojs/components'

interface IProps {
  title?: string
}

const NavBar: FC<IProps> = (props) => {
  const { title } = props
  return (
    <View>{title}</View>
  )
}

export default NavBar