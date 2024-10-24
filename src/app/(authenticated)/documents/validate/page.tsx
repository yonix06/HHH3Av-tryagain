'use client'

import { Typography, Table, Button, Modal, Input, Space } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { PageLayout } from '@/designSystem'
import { Api } from '@/core/trpc'
import { Prisma } from '@prisma/client'

export default function DocumentValidationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [feedbackModal, setFeedbackModal] = useState({
    visible: false,
    documentId: '',
    status: '',
  })
  const [feedback, setFeedback] = useState('')

  type Document = Prisma.DocumentGetPayload<{
    include: { documentVersions: true; status: true }
  }>

  const { data: pendingDocuments, isLoading, error, refetch } = Api.document.findMany.useQuery({
    where: { status: { name: 'PENDING' } },
    include: { documentVersions: true, status: true },
  })

  const { mutateAsync: createValidation } = Api.validation.create.useMutation()

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Error fetching documents', { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  const handleValidation = async (
    documentVersionId: string,
    status: 'APPROVED' | 'REJECTED',
  ) => {
    if (status === 'REJECTED') {
      setFeedbackModal({ visible: true, documentId: documentVersionId, status })
    } else {
      await submitValidation(documentVersionId, status, '')
    }
  }

  const submitValidation = async (
    documentVersionId: string,
    status: string,
    comment: string,
  ) => {
    try {
      await createValidation({
        data: {
          status,
          comment,
          userId: user?.id || '',
          documentVersionId,
        },
      })
      enqueueSnackbar(`Document ${status.toLowerCase()} successfully`, {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error validating document', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Document Name',
      dataIndex: ['name'],
      key: 'name',
    },
    {
      title: 'Version',
      dataIndex: ['documentVersions', '0', 'versionNumber'],
      key: 'version',
      render: (version: number | undefined) => version?.toString() ?? 'N/A',
    },
    {
      title: 'Created At',
      dataIndex: ['documentVersions', '0', 'createdAt'],
      key: 'createdAt',
      render: (date: string | undefined) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: ['status', 'name'],
      key: 'status',
      render: (status: string | undefined) => status ?? 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Document) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => record.documentVersions[0]?.id && handleValidation(record.documentVersions[0].id, 'APPROVED')}
            disabled={!record.documentVersions[0]?.id}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => record.documentVersions[0]?.id && handleValidation(record.documentVersions[0].id, 'REJECTED')}
            disabled={!record.documentVersions[0]?.id}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Document Validation</Title>
        <Text>Review and validate pending documents.</Text>

        <Table
          dataSource={pendingDocuments as Document[]}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          style={{ marginTop: '24px' }}
        />

        <Modal
          title="Provide Feedback"
          visible={feedbackModal.visible}
          onOk={() => {
            submitValidation(
              feedbackModal.documentId,
              feedbackModal.status,
              feedback,
            )
            setFeedbackModal({ visible: false, documentId: '', status: '' })
            setFeedback('')
          }}
          onCancel={() => {
            setFeedbackModal({ visible: false, documentId: '', status: '' })
            setFeedback('')
          }}
        >
          <Input.TextArea
            rows={4}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Enter your feedback here"
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
