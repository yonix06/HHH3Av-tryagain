'use client'

import {
  Typography,
  Tabs,
  Card,
  List,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
} from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminPanelPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')

  const { data: users } = Api.user.findMany.useQuery({})
  const { data: settings } = Api.organization.findUnique.useQuery({
    where: { id: organization?.id },
  })
  const { data: documents } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
  })
  const { data: templates } = Api.documentTemplate.findMany.useQuery({
    where: { organizationId: organization?.id },
  })
  const { data: tags } = Api.tag.findMany.useQuery({
    where: { organizationId: organization?.id },
  })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: updateOrganization } =
    Api.organization.update.useMutation()
  const { mutateAsync: createTemplate } =
    Api.documentTemplate.create.useMutation()
  const { mutateAsync: createTag } = Api.tag.create.useMutation()

  const handleUpdateUser = async (values: any) => {
    try {
      await updateUser({ where: { id: values.id }, data: values })
      enqueueSnackbar('User updated successfully', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to update user', { variant: 'error' })
    }
  }

  const handleUpdateSettings = async (values: any) => {
    try {
      await updateOrganization({
        where: { id: organization?.id },
        data: values,
      })
      enqueueSnackbar('Settings updated successfully', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to update settings', { variant: 'error' })
    }
  }

  const handleCreateTemplate = async (values: any) => {
    try {
      await createTemplate({
        data: { ...values, organizationId: organization?.id },
      })
      enqueueSnackbar('Template created successfully', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to create template', { variant: 'error' })
    }
  }

  const handleCreateTag = async (values: any) => {
    try {
      await createTag({ data: { ...values, organizationId: organization?.id } })
      enqueueSnackbar('Tag created successfully', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to create tag', { variant: 'error' })
    }
  }

  const showModal = (type: string) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  return (
    <PageLayout layout="full-width">
      <Card>
        <Title level={2}>Admin Panel</Title>
        <Text>
          Manage users, settings, and documents for your organization.
        </Text>
        <Tabs defaultActiveKey="1" style={{ marginTop: 16 }}>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Profiles
              </span>
            }
            key="1"
          >
            <List
              dataSource={users}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="edit" onClick={() => showModal('user')}>
                      Edit
                    </Button>,
                  ]}
                >
                  <List.Item.Meta title={item.name} description={item.email} />
                  <div>Role: {item.globalRole}</div>
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                System Settings
              </span>
            }
            key="2"
          >
            <List
              dataSource={[settings]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="edit" onClick={() => showModal('settings')}>
                      Edit
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title="Organization Settings"
                    description={`Name: ${item?.name}`}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Reports & Analytics
              </span>
            }
            key="3"
          >
            <List
              dataSource={[
                { title: 'Total Users', value: users?.length },
                { title: 'Total Documents', value: documents?.length },
                { title: 'Total Templates', value: templates?.length },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={item.value?.toString()}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Document Templates
              </span>
            }
            key="4"
          >
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
          </TabPane>
          <TabPane
            tab={
              <span>
                <TagsOutlined />
                Document Tags
              </span>
            }
            key="5"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button onClick={() => showModal('tag')}>Create New Tag</Button>
              <List
                dataSource={tags}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={item.name} />
                  </List.Item>
                )}
              />
            </Space>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} Form`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {modalType === 'user' && (
          <Form onFinish={handleUpdateUser}>
            <Form.Item name="id" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="globalRole" label="Global Role">
              <Select>
                <Select.Option value="USER">User</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update User
              </Button>
            </Form.Item>
          </Form>
        )}
        {modalType === 'settings' && (
          <Form onFinish={handleUpdateSettings}>
            <Form.Item name="name" label="Organization Name">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Settings
              </Button>
            </Form.Item>
          </Form>
        )}
        {modalType === 'template' && (
          <Form onFinish={handleCreateTemplate}>
            <Form.Item name="name" label="Template Name">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Template
              </Button>
            </Form.Item>
          </Form>
        )}
        {modalType === 'tag' && (
          <Form onFinish={handleCreateTag}>
            <Form.Item name="name" label="Tag Name">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Tag
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </PageLayout>
  )
}