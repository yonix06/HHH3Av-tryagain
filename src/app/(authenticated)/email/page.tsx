'use client'

import { useState } from 'react'
import {
  Typography,
  Form,
  Input,
  Select,
  Button,
  Upload,
  Space,
  Divider,
} from 'antd'
import {
  SendOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EmailComposerPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [selectedList, setSelectedList] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<string[]>([])

  const { data: emailLists, isLoading: isLoadingEmailLists, error: emailListsError } = Api.emailList.findMany.useQuery({
    where: { organizationId: organization?.id },
  })

  const { data: approvedDocuments, isLoading: isLoadingDocuments, error: documentsError } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: { documentVersions: true },
  })

  const { mutateAsync: upload } = useUploadPublic()

  const { mutateAsync: sendEmail } = Api.email.send.useMutation()

  const handleSendEmail = async (values: any) => {
    try {
      await sendEmail({
        subject: values.subject,
        content: values.content,
        emailListId: values.emailList,
        attachments: attachments,
      })
      enqueueSnackbar('Email sent successfully!', { variant: 'success' })
      form.resetFields()
      setAttachments([])
    } catch (error) {
      enqueueSnackbar(`Failed to send email: ${error.message}`, { variant: 'error' })
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      setAttachments(prev => [...prev, url])
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
      return false // Prevent default upload behavior
    } catch (error) {
      enqueueSnackbar(`Failed to upload file: ${error.message}`, { variant: 'error' })
    }
  }

  const handleApprovedDocumentSelect = (documentId: string) => {
    const document = approvedDocuments?.find(doc => doc.id === documentId)
    if (document && document.documentVersions.length > 0) {
      const latestVersion = document.documentVersions[document.documentVersions.length - 1]
      setAttachments(prev => [...prev, latestVersion.url])
    }
  }

  if (emailListsError) {
    enqueueSnackbar(`Error fetching email lists: ${emailListsError.message}`, { variant: 'error' })
  }

  if (documentsError) {
    enqueueSnackbar(`Error fetching approved documents: ${documentsError.message}`, { variant: 'error' })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Compose Email</Title>
        <Text>Send emails to your custom lists and attach documents.</Text>
        <Divider />
        <Form form={form} onFinish={handleSendEmail} layout="vertical">
          <Form.Item
            name="emailList"
            label="Select Email List"
            rules={[{ required: true, message: 'Please select an email list' }]}
          >
          <Select
            placeholder="Select an email list"
            onChange={value => setSelectedList(value)}
            loading={isLoadingEmailLists}
          >
            {emailLists?.map(list => (
              <Select.Option key={list.id} value={list.id}>
                {list.name}
              </Select.Option>
            ))}
          </Select>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Email Content"
            rules={[{ required: true, message: 'Please enter email content' }]}
          >
            <TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Attachments">
            <Space direction="vertical">
              <Upload beforeUpload={handleFileUpload} fileList={[]}>
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
              <Select
                style={{ width: '100%' }}
                placeholder="Select approved document"
                onChange={handleApprovedDocumentSelect}
                loading={isLoadingDocuments}
              >
              {approvedDocuments?.filter(doc => doc.documentVersions.length > 0).map(doc => {
                const latestVersion = doc.documentVersions[doc.documentVersions.length - 1]
                return (
                  <Select.Option key={doc.id} value={doc.id}>
                    {doc.name} (v{latestVersion.versionNumber})
                  </Select.Option>
                )
              })}
              </Select>
              {attachments.length > 0 && (
                <Text>Attached: {attachments.join(', ')}</Text>
              )}
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
