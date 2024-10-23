'use client'

import { Typography, Table, Button, Modal, Input, Space } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

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

  const {
    data: pendingDocuments,
    isLoading,
    refetch,
  } = Api.documentVersion.findMany.useQuery({
    where: {
      validations: {
        none: {
          userId: user?.id,
        },
      },
    },
    include: {
      document: true,
    },
  })

  const { mutateAsync: createValidation } = Api.validation.create.useMutation()

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
      dataIndex: ['document', 'name'],
      key: 'name',
    },
    {
      title: 'Version',
      dataIndex: 'versionNumber',
      key: 'version',
      render: (version: number) => version.toString(),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleValidation(record.id, 'APPROVED')}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleValidation(record.id, 'REJECTED')}
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
          dataSource={pendingDocuments}
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