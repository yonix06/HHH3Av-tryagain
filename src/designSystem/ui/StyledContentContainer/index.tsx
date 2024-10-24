import { Card, Space } from 'antd'
import React from 'react'

interface StyledContentContainerProps {
  children: React.ReactNode
}

export const StyledContentContainer: React.FC<StyledContentContainerProps> = ({
  children,
}) => {
  return (
    <Card
      style={{
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
      }}
    >
      <Space direction="vertical" style={{ width: '80%' }}>
        {children}
      </Space>
    </Card>
  )
}
