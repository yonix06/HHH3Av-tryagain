'use client'

import { useState, useEffect } from 'react'
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
import { dummyDocuments, dummyTags } from '@/utils/dummyData'

export default function DocumentManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setDocuments(dummyDocuments)
        setTags(dummyTags)
      } catch (error) {
        console.error('Error setting documents:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const filteredDocuments = documents.filter(doc =>
    selectedTags.length === 0 || doc.tags.some(tag => selectedTags.includes(tag))
  )

  const createDocument = async (values: any) => {
    // Simulating document creation with dummy data
    const newDocument = {
      id: Math.random().toString(36).substr(2, 9),
      ...values,
      status: 'DRAFT',
      tags: [],
      versions: [],
    }
    setDocuments([...documents, newDocument])
    return newDocument
  }

  const updateDocument = async (id: string, values: any) => {
    // Simulating document update with dummy data
    const updatedDocuments = documents.map(doc =>
      doc.id === id ? { ...doc, ...values } : doc
    )
    setDocuments(updatedDocuments)
    return updatedDocuments.find(doc => doc.id === id)
  }

  const handleCreateDocument = async (values: any) => {
    try {
      const newDocument = await createDocument({
        ...values,
        userId: user?.id,
        organizationId: organization?.id,
      })
      enqueueSnackbar('Document created successfully', { variant: 'success' })
      setIsCreateModalVisible(false)
      setDocuments([...documents, newDocument])
    } catch (error) {
      enqueueSnackbar('Failed to create document', { variant: 'error' })
    }
  }

  const handleEditDocument = async (values: any) => {
    try {
      const updatedDocument = await updateDocument(selectedDocument.id, values)
      enqueueSnackbar('Document updated successfully', { variant: 'success' })
      setIsEditModalVisible(false)
      setDocuments(documents.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc))
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
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags?.map(tagName => {
            const tag = dummyTags.find(t => t.name === tagName);
            return (
              <Tag color={tag?.color} key={tag?.id}>
                {tagName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Version',
      dataIndex: 'versions',
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

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Document Management</Title>
        <Text>Manage your documents, their statuses, tags, and versions.</Text>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}
            >
              Create New Document
            </Button>
            <Select
              mode="multiple"
              style={{ width: '300px' }}
              placeholder="Filter by tags"
              onChange={handleTagChange}
              value={selectedTags}
            >
              {tags.map(tag => (
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDocuments}
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
              <Select.Option value="template1">Template 1</Select.Option>
              <Select.Option value="template2">Template 2</Select.Option>
              <Select.Option value="template3">Template 3</Select.Option>
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
