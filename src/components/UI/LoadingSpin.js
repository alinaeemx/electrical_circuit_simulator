import React from 'react'
import { Layout, Spin } from 'antd'

export const LoadingSpin = () => {
  return (
    <Spin
      style={{ maxHeight: '100vh' }}
      size="large" className="h-screen w-screen flex flex-col" >
      <Layout className="h-screen w-screen flex flex-col" />
    </Spin>
  )
}
