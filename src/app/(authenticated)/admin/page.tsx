'use client'

import {
  Typography,
  Card,
  Modal,
  Form,
  Input,
  Select,
  ColorPicker,
  Button,
  List,
  Flex,
  Spin,
} from 'antd'

import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import useLocalization from '@/hooks/useLocalization'
import { getLanguages } from '@/i18n/config'
import { OverviewTab } from './components/OverviewTab'
import { SystemSettingsTab } from './components/SystemSettingsTab'
import { DocumentTemplatesTab } from './components/DocumentTemplatesTab'
import { DocumentTagsTab } from './components/DocumentTagsTab'
import { ThemeSettingsTab } from './components/ThemeSettingsTab'
import { LanguageManagementTab } from './components/LanguageManagementTab'
import { LeftAdminMenu } from './components/LeftAdminMenu'
import { ReportsAnalyticsTab } from './components/ReportsAnalyticsTab'

export default function AdminPanelPage() {
  const router = useRouter()
  const { user, organization, organizations } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const { t, changeLanguage, currentLanguage } = useLocalization()
  const [activeMenuKey, setActiveMenuKey] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

const { data: users, refetch: refetchUsers, isLoading: isLoadingUsers, error: usersError } = Api.user.findMany.useQuery({
  include: { organizationRoles: { include: { organization: true } } }
}, {
  onError: (error) => enqueueSnackbar(`Error fetching users: ${error.message}`, { variant: 'error' })
})
  const { data: userOrganizations, refetch: refetchUserOrganizations, isLoading: isLoadingUserOrganizations, error: userOrganizationsError } = Api.organizationRole.findMany.useQuery({
    where: { userId: user?.id },
    include: { organization: true },
  }, {
    onError: (error) => enqueueSnackbar(`Error fetching user organizations: ${error.message}`, { variant: 'error' })
  });
  const { data: settings, isLoading: isLoadingSettings, error: settingsError } = Api.organization.findUnique.useQuery({
    where: { id: organization?.id },
  }, {
    onError: (error) => enqueueSnackbar(`Error fetching settings: ${error.message}`, { variant: 'error' })
  })
  const { data: documents, isLoading: isLoadingDocuments, error: documentsError } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
  }, {
    onError: (error) => enqueueSnackbar(`Error fetching documents: ${error.message}`, { variant: 'error' })
  })
  const { data: templates, isLoading: isLoadingTemplates, error: templatesError } = Api.documentTemplate.findMany.useQuery({
    where: organization?.id ? { organizationId: organization.id } : {},
  }, {
    onError: (error) => enqueueSnackbar(`Error fetching templates: ${error.message}`, { variant: 'error' })
  })
const { data: tags, isLoading: isLoadingTags, error: tagsError } = Api.tag.findMany.useQuery({
  where: { organizationId: organization?.id },
  select: { id: true, name: true, color: true }
}, {
  onError: (error) => enqueueSnackbar(`Error fetching tags: ${error.message}`, { variant: 'error' })
})
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([refetchUsers(), refetchUserOrganizations()]);
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
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
      await createTag({ data: { ...values, organizationId: organization?.id, color: values.color.toHexString() } })
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

  const handleMenuChange = (key: string) => {
    setActiveMenuKey(key)
  }

  const renderContent = () => {
    if (isLoading || isLoadingUsers || isLoadingUserOrganizations || isLoadingSettings || isLoadingDocuments || isLoadingTemplates || isLoadingTags) {
      return <Spin size="large" />;
    }

    switch (activeMenuKey) {
      case 'overview':
        return <OverviewTab handleShortcutClick={handleMenuChange} />;
      case 'user-profiles':
        return (
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
                      <div>Organization: {item.organizationRoles[0]?.organization.name || 'N/A'}</div>
                    </>
                  } 
                />
                <div>Role: {item.globalRole}</div>
              </List.Item>
            )}
          />
        );
      case 'system-settings':
        return <SystemSettingsTab settings={settings} showModal={showModal} />;
      case 'reports-analytics':
        return <ReportsAnalyticsTab users={users} documents={documents} templates={templates} />;
      case 'document-templates':
        return <DocumentTemplatesTab templates={templates} showModal={showModal} />;
      case 'document-tags':
        return <DocumentTagsTab tags={tags} showModal={showModal} />;
      case 'theme-settings':
        return <ThemeSettingsTab showModal={showModal} handleUpdateTheme={handleUpdateTheme} />;
      case 'language-management':
        return (
          <LanguageManagementTab
            languages={languages}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            handleRemoveLanguage={handleRemoveLanguage}
            handleAddLanguage={handleAddLanguage}
            t={t}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout layout="narrow">
      <Flex style={{ height: '100%' }}>
        <div style={{ width: '200px' }}>
          <LeftAdminMenu selectedKey={activeMenuKey} onSelect={handleMenuChange} />
        </div>
        <Flex flex={1} vertical>
          <Title level={2}>🐧 Admin Panel</Title>
          <Card>
            {renderContent()}
          </Card>
        </Flex>
      </Flex>

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
