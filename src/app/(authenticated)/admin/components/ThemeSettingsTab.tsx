import React from 'react'
import { Button, Form, Input, ColorPicker } from 'antd'

type Props = {
  showModal: (type: string) => void
  handleUpdateTheme: (values: any) => Promise<void>
}

export const ThemeSettingsTab: React.FC<Props> = ({ showModal, handleUpdateTheme }) => {
  return (
    <>
      <Button onClick={() => showModal('theme')}>
        Edit Theme Settings
      </Button>
      <Form onFinish={handleUpdateTheme}>
        <Form.Item name={['colors', 'primary']} label="Primary Color">
          <ColorPicker />
        </Form.Item>
        <Form.Item name={['colors', 'secondary']} label="Secondary Color">
          <ColorPicker />
        </Form.Item>
        <Form.Item name={['typography', 'fontSize']} label="Font Size">
          <Input type="number" />
        </Form.Item>
        <Form.Item name={['typography', 'fontFamily']} label="Font Family">
          <Input />
        </Form.Item>
        <Form.Item name={['layout', 'containerWidth']} label="Container Width">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Theme
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
