'use client'

import { useState } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  HistoryOutlined,
  MailOutlined,
  PrinterOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  const {
    data: documents,
    isLoading,
    refetch,
  } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: {
      documentVersions: true,
      documentTags: { include: { tag: true } },
    },
  })

  const { data: templates } = Api.documentTemplate.findMany.useQuery({
    where: { organizationId: organization?.id },
  })

  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()

  const handleCreateDocument = async (values: any) => {
    try {
      await createDocument({
        data: {
          ...values,
          userId: user?.id,
          organizationId: organization?.id,
        },
      })
      enqueueSnackbar('Document created successfully', { variant: 'success' })
      setIsCreateModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to create document', { variant: 'error' })
    }
  }

  const handleEditDocument = async (values: any) => {
    try {
      await updateDocument({
        where: { id: selectedDocument.id },
        data: values,
      })
      enqueueSnackbar('Document updated successfully', { variant: 'success' })
      setIsEditModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update document', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) => {
        const latestVersion =
          record.documentVersions[record.documentVersions.length - 1]
        return latestVersion ? 'Published' : 'Draft'
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'documentTags',
      render: (tags: any[]) => (
        <>
          {tags?.map(tag => (
            <Tag color="blue" key={tag.tag.id}>
              {tag.tag.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Version',
      dataIndex: 'documentVersions',
      key: 'version',
      render: (versions: any[]) =>
        versions?.length > 0
          ? versions[versions.length - 1].versionNumber
          : 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedDocument(record)
              setIsEditModalVisible(true)
            }}
          >
            Edit
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => router.push(`/documents/${record.id}/edit`)}
          >
            Changelog
          </Button>
          <Button
            icon={<MailOutlined />}
            onClick={() =>
              enqueueSnackbar('Email functionality not implemented', {
                variant: 'info',
              })
            }
          >
            Email
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={() =>
              enqueueSnackbar('Print functionality not implemented', {
                variant: 'info',
              })
            }
          >
            Print
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Document Management</Title>
        <Text>Manage your documents, their statuses, tags, and versions.</Text>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            Create New Document
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={documents}
          loading={isLoading}
          rowKey="id"
        />

        <Modal
          title="Create New Document"
          visible={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleCreateDocument}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input the document name!' },
              ]}
            >
              <Input placeholder="Document Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item name="templateId">
              <Select placeholder="Select a template">
                {templates?.map(template => (
                  <Select.Option key={template.id} value={template.id}>
                    {template.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit Document"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleEditDocument} initialValues={selectedDocument}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please input the document name!' },
              ]}
            >
              <Input placeholder="Document Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
