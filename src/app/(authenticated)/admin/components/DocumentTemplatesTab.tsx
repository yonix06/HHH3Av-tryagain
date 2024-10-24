import React from 'react'
import { Space, Button, List } from 'antd'
import dayjs from 'dayjs'

type Props = {
  templates: any[]
  showModal: (type: string) => void
}

export const DocumentTemplatesTab: React.FC<Props> = ({ templates, showModal }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={() => showModal('template')}>
        Create New Template
      </Button>
      <List
        dataSource={templates}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={item.description}
            />
            <div>
              Created: {dayjs(item.createdAt).format('YYYY-MM-DD')}
            </div>
          </List.Item>
        )}
      />
    </Space>
  )
}
