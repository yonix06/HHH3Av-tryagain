'use client'

import {
  Typography,
  Tabs,
  Card,
  Modal,
  Form,
  Input,
  Select,
  ColorPicker,
  Button,
  List,
} from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TagsOutlined,
  BgColorsOutlined,
  GlobalOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { useUserContext } from '@/core/context'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { dummyTags } from '@/utils/dummyData'
import useLocalization from '@/hooks/useLocalization'
import { getLanguages } from '@/i18n/config'
import { OverviewTab } from './components/OverviewTab'
import { SystemSettingsTab } from './components/SystemSettingsTab'
import { DocumentTemplatesTab } from './components/DocumentTemplatesTab'
import { DocumentTagsTab } from './components/DocumentTagsTab'
import { ThemeSettingsTab } from './components/ThemeSettingsTab'
import { LanguageManagementTab } from './components/LanguageManagementTab'

export default function AdminPanelPage() {
  const router = useRouter()
  const { user, organization, organizations } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const { t, changeLanguage, currentLanguage } = useLocalization()
  const [activeTabKey, setActiveTabKey] = useState('overview')

  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({})
  const { data: userOrganizations, refetch: refetchUserOrganizations } = Api.organizationRole.findMany.useQuery({
    where: { userId: user?.id },
    include: { organization: true },
  });
  const { data: settings } = Api.organization.findUnique.useQuery({
    where: { id: organization?.id },
  })
  const { data: documents } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
  })
  const { data: templates } = Api.documentTemplate.findMany.useQuery({
    where: organization?.id ? { organizationId: organization.id } : {},
  })
  const tags = dummyTags
  const [languages, setLanguages] = useState<string[]>(getLanguages())

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: updateOrganization } =
    Api.organization.update.useMutation()
  const { mutateAsync: createTemplate } =
    Api.documentTemplate.create.useMutation()
  const { mutateAsync: createTag } = Api.tag.create.useMutation()
  const { mutateAsync: createOrganizationRole } = Api.organizationRole.create.useMutation()
  const { mutateAsync: updateOrganizationRole } = Api.organizationRole.update.useMutation()
  const apiUtils = Api.useUtils()
  const { data: organizationRoleData, refetch: refetchOrganizationRole } = Api.organizationRole.findFirst.useQuery({
    where: {
      userId: user?.id,
      organizationId: organization?.id,
    },
  }, { enabled: false })

  useEffect(() => {
    refetchUsers();
    refetchUserOrganizations();
  }, [organization])

  const handleUpdateUser = async (values: any) => {
    try {
      await updateUser({
        where: { id: values.id },
        data: {
          name: values.name,
          email: values.email,
          globalRole: values.globalRole,
        },
      });
      if (values.organizationId) {
        const existingRole = await apiUtils.organizationRole.findFirst.fetch({
          where: {
            userId: values.id,
            organizationId: values.organizationId,
          },
        });
        if (existingRole) {
          await updateOrganizationRole({
            where: { id: existingRole.id },
            data: { name: 'member' },
          });
        } else {
          await createOrganizationRole({
            data: {
              userId: values.id,
              organizationId: values.organizationId,
              name: 'member',
            },
          });
        }
      }
      enqueueSnackbar('User updated successfully', { variant: 'success' });
      setIsModalVisible(false);
      refetchUsers();
      refetchUserOrganizations();
      refetchOrganizationRole();
    } catch (error) {
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    }
  };

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

  const handleUpdateTheme = async (values: any) => {
    try {
      await updateOrganization({
        where: { id: organization?.id },
        data: { theme: values },
      })
      enqueueSnackbar('Theme settings updated successfully', { variant: 'success' })
      setIsModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to update theme settings', { variant: 'error' })
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

  const handleAddLanguage = (language: string) => {
    if (languages && !languages.includes(language)) {
      setLanguages([...languages, language])
      enqueueSnackbar(`Language ${language} added successfully`, { variant: 'success' })
    } else {
      enqueueSnackbar(`Language ${language} already exists`, { variant: 'warning' })
    }
  }

  const handleRemoveLanguage = (language: string) => {
    if (language === 'en') {
      enqueueSnackbar('Cannot remove default language (English)', { variant: 'error' })
    } else if (languages) {
      setLanguages(languages.filter(lang => lang !== language))
      enqueueSnackbar(`Language ${language} removed successfully`, { variant: 'success' })
    }
  }

  const showModal = (type: string) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  const handleTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const handleShortcutClick = (key: string) => {
    setActiveTabKey(key)
  }

  return (
    <PageLayout layout="full-width">
      <Card>
        <Title level={2}>Admin Panel</Title>
        <Text>
          Manage users, settings, and documents for your organization.
        </Text>
        <Tabs activeKey={activeTabKey} onChange={handleTabChange} style={{ marginTop: 16 }}>
          <TabPane
            tab={
              <span>
                <AppstoreOutlined />
                Overview
              </span>
            }
            key="overview"
          >
            <OverviewTab handleShortcutClick={handleShortcutClick} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Profiles
              </span>
            }
            key="user-profiles"
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
                  <List.Item.Meta 
                    title={item.name} 
                    description={
                      <>
                        <div>{item.email}</div>
                        <div>Organization: N/A</div>
                      </>
                    } 
                  />
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
            key="system-settings"
          >
            <SystemSettingsTab settings={settings} showModal={showModal} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Reports & Analytics
              </span>
            }
            key="reports-analytics"
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
            key="document-templates"
          >
            <DocumentTemplatesTab templates={templates} showModal={showModal} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <TagsOutlined />
                Document Tags
              </span>
            }
            key="document-tags"
          >
            <DocumentTagsTab tags={tags} showModal={showModal} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BgColorsOutlined />
                Theme Settings
              </span>
            }
            key="theme-settings"
          >
            <ThemeSettingsTab showModal={showModal} handleUpdateTheme={handleUpdateTheme} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                Language Management
              </span>
            }
            key="language-management"
          >
            <LanguageManagementTab
              languages={languages}
              currentLanguage={currentLanguage}
              changeLanguage={changeLanguage}
              handleRemoveLanguage={handleRemoveLanguage}
              handleAddLanguage={handleAddLanguage}
              t={t}
            />
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
            <Form.Item name="organizationId" label="Add to Organization">
              <Select>
                <Select.Option value="">None</Select.Option>
                {organizations.map(org => (
                  <Select.Option key={org.id} value={org.id}>
                    {org.name}
                  </Select.Option>
                ))}
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
            <Form.Item name="color" label="Tag Color">
              <ColorPicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Tag
              </Button>
            </Form.Item>
          </Form>
        )}
        {modalType === 'theme' && (
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
        )}
      </Modal>
    </PageLayout>
  )
}
