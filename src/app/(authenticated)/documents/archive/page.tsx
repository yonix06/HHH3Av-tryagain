'use client'

import { useState, useEffect } from 'react'
import { Typography, Input, Table, Space, Button, Modal, DatePicker, Select } from 'antd'
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
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null)
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
  const [contentSearch, setContentSearch] = useState('')
  const [filteredDocuments, setFilteredDocuments] = useState<any[]>([])

  // Dummy data for authors, replace with actual data fetching
  const authors = [
    { value: 'author1', label: 'Author 1' },
    { value: 'author2', label: 'Author 2' },
    // Add more authors as needed
  ]

  const {
    data: documents,
    isLoading,
    refetch,
    error,
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

  useEffect(() => {
    if (documents) {
      setFilteredDocuments(
        documents.filter(
          doc =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [documents, searchTerm])

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error fetching documents', { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Dernière modification',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY à HH:mm'),
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
        <Title level={2}>Recherche</Title>
        <Text>Consultez et gérez toutes les versions des documents archivés</Text><br />
        <Text>Pour effectuer une recherche, utilisez la barre ci-dessous et les critères avancés si nécessaire.</Text>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: 24 }}>
          <Input
            placeholder="Rechercher des documents"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button 
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            style={{ marginTop: 16 }}
          >
            {showAdvancedSearch ? 'Masquer' : 'Afficher'} la recherche avancée
          </Button>
          {showAdvancedSearch && (
            <div style={{ marginTop: 16, width: '100%', maxWidth: 300 }}>
              <DatePicker.RangePicker 
                style={{ marginBottom: 8, width: '100%' }}
                onChange={(dates) => setDateRange(dates)}
                value={dateRange}
              />
              <Select
                style={{ width: '100%', marginBottom: 8 }}
                placeholder="Sélectionner un auteur"
                options={authors}
                onChange={(value) => setSelectedAuthor(value)}
                value={selectedAuthor}
              />
              <Input
                placeholder="Rechercher dans le contenu"
                style={{ width: '100%' }}
              />
            </div>
          )}

          <Table
            dataSource={filteredDocuments}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            style={{ marginTop: 24, width: '100%' }}
          />
          {error && <Text type="danger">Error loading documents. Please try again.</Text>}
        </div>

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
