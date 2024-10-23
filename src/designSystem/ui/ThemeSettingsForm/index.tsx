import React from 'react'
import { Form, Input, ColorPicker, Select, Button } from 'antd'
import { Theme } from '@/designSystem/theme/theme'

type Props = {
  onSubmit: (values: any) => void
}

export const ThemeSettingsForm: React.FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm()
  const defaultTheme = Theme({})

  const handleSubmit = (values: any) => {
    onSubmit(values)
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={defaultTheme.token}>
      <Form.Item name={['colorPrimary']} label="Primary Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorError']} label="Error Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorSuccess']} label="Success Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorInfo']} label="Info Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorWarning']} label="Warning Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorTextBase']} label="Text Base Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorLink']} label="Link Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorBgBase']} label="Background Base Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorBgContainer']} label="Container Background Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorBorder']} label="Border Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorBorderSecondary']} label="Secondary Border Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['colorSplit']} label="Split Color">
        <ColorPicker />
      </Form.Item>
      <Form.Item name={['fontSize']} label="Font Size">
        <Input type="number" />
      </Form.Item>
      <Form.Item name={['fontFamily']} label="Font Family">
        <Select>
          <Select.Option value={defaultTheme.token.fontFamily}>Default</Select.Option>
          <Select.Option value="Arial, sans-serif">Arial</Select.Option>
          <Select.Option value="Helvetica, sans-serif">Helvetica</Select.Option>
          <Select.Option value="Georgia, serif">Georgia</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name={['padding']} label="Layout Padding">
        <Input type="number" />
      </Form.Item>
      <Form.Item name={['borderRadius']} label="Border Radius">
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Theme
        </Button>
      </Form.Item>
    </Form>
  )
}
