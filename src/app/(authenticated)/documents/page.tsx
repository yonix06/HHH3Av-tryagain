'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Select,
  Space,
  Tag,
  List,
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
import { Prisma } from '@prisma/client'

type Document = Prisma.DocumentGetPayload<{
  include: {
    documentTags: {
      include: { tag: true }
    }
    documentVersions: {
      include: { changes: true; url: true }
    }
    status: true
  }
}>

export default function DocumentManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isChangelogModalVisible, setIsChangelogModalVisible] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  const { data: documents, isLoading, error } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: { 
      documentTags: { include: { tag: true } }, 
      documentVersions: { include: { changes: true, url: true } }, 
      status: true
    },
  })

  const { data: tags } = Api.tag.findMany.useQuery({
    where: { organizationId: organization?.id },
  })

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error fetching documents', { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  const filteredDocuments = documents?.filter((doc: Document) =>
    selectedTags.length === 0 || doc.documentTags.some(dt => selectedTags.includes(dt.tag.id))
  ) || []

  const handleOpenChangelogModal = (documentId: string) => {
    setSelectedDocumentId(documentId)
    setIsChangelogModalVisible(true)
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
      render: (status: Document['status']) => status?.name || 'N/A',
    },
    {
      title: 'URL',
      dataIndex: 'documentVersions',
      key: 'url',
      render: (versions: Document['documentVersions']) => {
        const latestVersion = versions[versions.length - 1];
        return latestVersion ? (
          <a href={latestVersion.url} target="_blank" rel="noopener noreferrer">
            View Document
          </a>
        ) : 'N/A';
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'documentTags',
      render: (documentTags: Document['documentTags']) => (
        <>
          {documentTags.map(dt => (
            <Tag color={dt.tag.color} key={dt.tag.id}>
              {dt.tag.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Version',
      dataIndex: 'documentVersions',
      key: 'version',
      render: (versions: Document['documentVersions']) =>
        versions.length > 0
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
            onClick={() => router.push(`/documents/${record.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => handleOpenChangelogModal(record.id)}
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

  const fetchChangelogData = (documentId: string) => {
    const document = documents?.find((doc: Document) => doc.id === documentId)
    return document ? document.documentVersions.map(version => ({
      ...version,
      changes: version.changes || []
    })) : []
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
              onClick={() => router.push('/documents/create')}
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
              {tags?.map(tag => (
                <Select.Option key={tag.id} value={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredDocuments as Document[]}
          loading={isLoading}
          rowKey="id"
        />

        <Modal
          title="Document Changelog"
          visible={isChangelogModalVisible}
          onCancel={() => setIsChangelogModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsChangelogModalVisible(false)}>
              Close
            </Button>
          ]}
        >
          <List
            dataSource={selectedDocumentId ? fetchChangelogData(selectedDocumentId) : []}
            renderItem={(item: Document['documentVersions'][0]) => (
              <List.Item>
                <List.Item.Meta
                  title={`Version ${item.versionNumber}`}
                  description={`Created at: ${dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}`}
                />
                <div>
                  {item.changes && item.changes.length > 0 ? (
                    item.changes.map((change, index) => (
                      <div key={index}>{change.description}</div>
                    ))
                  ) : (
                    'No changes recorded'
                  )}
                </div>
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
