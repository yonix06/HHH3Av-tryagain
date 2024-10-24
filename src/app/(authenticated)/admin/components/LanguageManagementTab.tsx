import React from 'react'
import { Button, List, Space } from 'antd'

interface LanguageManagementTabProps {
  handleAddLanguage: (language: string) => void
  languages: string[]
  currentLanguage: string
  changeLanguage: (language: string) => void
  handleRemoveLanguage: (language: string) => void
  t: (key: string) => string
}

export function LanguageManagementTab({
  handleAddLanguage,
  languages,
  currentLanguage,
  changeLanguage,
  handleRemoveLanguage,
  t
}: LanguageManagementTabProps) {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={(e) => handleAddLanguage(e.currentTarget.textContent || '')}>{t('Add New Language')}</Button>
      <List
        dataSource={languages}
        renderItem={item => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => changeLanguage(item)}>
                {t('Set as Current')}
              </Button>,
              <Button key="delete" danger onClick={() => handleRemoveLanguage(item)} disabled={item === 'en'}>
                {t('Remove')}
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.toUpperCase()}
              description={item === currentLanguage ? t('Current Language') : ''}
            />
          </List.Item>
        )}
      />
    </Space>
  )
}
