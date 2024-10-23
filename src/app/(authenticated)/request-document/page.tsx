'use client'

import { useState } from 'react'
import { Typography, Form, Input, Button, Modal, Space } from 'antd'
import { FileTextOutlined, QuestionCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Prisma } from '@prisma/client'

export default function DocumentRequestPage() {
  const router = useRouter()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [form] = Form.useForm()

  const { mutateAsync: createDocumentRequest } =
    Api.documentRequest.create.useMutation()

  const onFinish = async (values: any) => {
    try {
      if (!user?.id || !organization?.id) {
        enqueueSnackbar('User or organization not found', { variant: 'error' })
        return
      }

      const documentRequestData: Prisma.DocumentRequestCreateInput = {
        status: 'PENDING',
        user: { connect: { id: user.id } },
        document: {
          create: {
            name: values.documentName,
            description: values.documentDescription,
            userId: user.id,
            organizationId: organization.id,
          },
        },
      }

      await createDocumentRequest({
        data: documentRequestData,
      })

      enqueueSnackbar('Document request submitted successfully', {
        variant: 'success',
      })
      router.push('/documents')
    } catch (error) {
      enqueueSnackbar('Failed to submit document request', { variant: 'error' })
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <FileTextOutlined /> Request a Document
        </Title>
        <Paragraph>
          Fill out the form below to request a new document. If you're unsure
          what to ask for, use the helper modal.
        </Paragraph>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="documentName"
            label="Document Name"
            rules={[
              { required: true, message: 'Please input the document name!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="documentDescription"
            label="Document Description"
            rules={[
              {
                required: true,
                message: 'Please input the document description!',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit Request
              </Button>
              <Button onClick={showModal} icon={<QuestionCircleOutlined />}>
                Need Help?
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <Modal
          title="Document Request Helper"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            Here are some pre-filled questions to help you with your document
            request:
          </p>
          <ul>
            <li>What is the purpose of this document?</li>
            <li>Who is the intended audience?</li>
            <li>What specific information should be included?</li>
            <li>Are there any formatting requirements?</li>
            <li>When do you need this document by?</li>
          </ul>
          <p>
            Use these questions to guide you in filling out the document request
            form.
          </p>
        </Modal>
      </div>
    </PageLayout>
  )
}
