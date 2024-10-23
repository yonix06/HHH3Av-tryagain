'use client'

import { useState } from 'react'
import { Typography, Input, Table, Space, Button, Modal } from 'antd'
import {
  SearchOutlined,
  HistoryOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ArchivePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVersion, setSelectedVersion] = useState<any>(null)

  const {
    data: documents,
    isLoading,
    refetch,
  } = Api.document.findMany.useQuery({
    include: { documentVersions: true },
  })

  const { mutateAsync: restoreVersion } =
    Api.documentVersion.update.useMutation()

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleRestore = async (version: any) => {
    try {
      await restoreVersion({
        where: { id: version.id },
        data: { versionNumber: version.versionNumber + 1 },
      })
      enqueueSnackbar('Document version restored successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to restore document version', {
        variant: 'error',
      })
    }
  }

  const filteredDocuments = documents?.filter(
    doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const columns = [
    {
      title: 'Document Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          icon={<HistoryOutlined />}
          onClick={() => setSelectedVersion(record)}
        >
          View Versions
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Document Archive</Title>
        <Text>View and manage all versions of archived documents</Text>

        <Space
          direction="vertical"
          size="large"
          style={{ width: '100%', marginTop: 24 }}
        >
          <Input
            placeholder="Search documents"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />

          <Table
            dataSource={filteredDocuments}
            columns={columns}
            rowKey="id"
            loading={isLoading}
          />
        </Space>

        <Modal
          title="Document Versions"
          visible={!!selectedVersion}
          onCancel={() => setSelectedVersion(null)}
          footer={null}
          width={800}
        >
          {selectedVersion && (
            <Table
              dataSource={selectedVersion.documentVersions}
              columns={[
                {
                  title: 'Version',
                  dataIndex: 'versionNumber',
                  key: 'versionNumber',
                },
                {
                  title: 'Created At',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (date: string) =>
                    dayjs(date).format('YYYY-MM-DD HH:mm'),
                },
                {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, record: any) => (
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={() => handleRestore(record)}
                    >
                      Restore
                    </Button>
                  ),
                },
              ]}
              rowKey="id"
            />
          )}
        </Modal>
      </div>
    </PageLayout>
  )
}
