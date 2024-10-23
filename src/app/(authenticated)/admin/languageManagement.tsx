'use client'

import React, { useState, useEffect } from 'react'
import { Typography, Form, Input, Button, List, Space, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useLocalization from '@/hooks/useLocalization'

const { Title } = Typography

const LanguageManagement: React.FC = () => {
  const [form] = Form.useForm()
  const [languages, setLanguages] = useState<string[]>([])
  const [editingLanguage, setEditingLanguage] = useState<string | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { t, changeLanguage, currentLanguage } = useLocalization()

  useEffect(() => {
    // In a real application, you would fetch the languages from your backend or i18n configuration
    setLanguages(['en', 'es', 'fr'])
  }, [])

  const handleAddLanguage = (values: { languageCode: string }) => {
    const newLanguage = values.languageCode.toLowerCase()
    if (languages.includes(newLanguage)) {
      message.error('Language already exists')
    } else {
      setLanguages([...languages, newLanguage])
      form.resetFields()
      message.success('Language added successfully')
    }
  }

  const handleEditLanguage = (language: string) => {
    setEditingLanguage(language)
    setIsModalVisible(true)
    form.setFieldsValue({ languageCode: language })
  }

  const handleUpdateLanguage = (values: { languageCode: string }) => {
    const updatedLanguage = values.languageCode.toLowerCase()
    if (languages.includes(updatedLanguage) && updatedLanguage !== editingLanguage) {
      message.error('Language already exists')
    } else {
      setLanguages(languages.map(lang => (lang === editingLanguage ? updatedLanguage : lang)))
      setIsModalVisible(false)
      setEditingLanguage(null)
      form.resetFields()
      message.success('Language updated successfully')
    }
  }

  const handleDeleteLanguage = (language: string) => {
    if (language === 'en') {
      message.error('Cannot delete the default language')
    } else {
      setLanguages(languages.filter(lang => lang !== language))
      message.success('Language deleted successfully')
    }
  }

  return (
    <div>
      <Title level={2}>{t('Language Management')}</Title>
      <Form form={form} onFinish={handleAddLanguage} layout="inline">
        <Form.Item
          name="languageCode"
          rules={[{ required: true, message: 'Please input the language code!' }]}
        >
          <Input placeholder="Language code (e.g., en, es, fr)" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Language
          </Button>
        </Form.Item>
      </Form>
      <List
        style={{ marginTop: 20 }}
        dataSource={languages}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditLanguage(item)}
                key="edit"
              >
                Edit
              </Button>,
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteLanguage(item)}
                disabled={item === 'en'}
                danger
                key="delete"
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.toUpperCase()}
              description={item === currentLanguage ? 'Current Language' : ''}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Edit Language"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingLanguage(null)
          form.resetFields()
        }}
      >
        <Form form={form} onFinish={handleUpdateLanguage}>
          <Form.Item
            name="languageCode"
            rules={[{ required: true, message: 'Please input the language code!' }]}
          >
            <Input placeholder="Language code (e.g., en, es, fr)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LanguageManagement
