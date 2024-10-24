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
  const { data: emailLists, isLoading: isLoadingEmailLists, error: emailListsError } = Api.emailList.findMany.useQuery({
    where: { organizationId: organization?.id },
  })

  const { mutateAsync: sendEmail } = Api.email.send.useMutation()

  const handleSendEmail = async (values: any) => {
    if (!user) {
      enqueueSnackbar('User is not defined', { variant: 'error' })
      return
    }
    try {
      await sendEmail({
        userId: user.id,
        subject: values.subject,
        content: values.content,
        templateKey: 'welcome',
      })
      enqueueSnackbar('Email sent successfully!', { variant: 'success' })
      form.resetFields()
    } catch (error) {
      enqueueSnackbar(`Failed to send email: ${error.message}`, { variant: 'error' })
    }
  }

  if (emailListsError) {
    enqueueSnackbar(`Error fetching email lists: ${emailListsError.message}`, { variant: 'error' })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Compose Email</Title>
        <Text>Send emails to your custom lists and attach documents.</Text>
        <Divider />
        <Form form={form} onFinish={handleSendEmail} layout="vertical">
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter email content' }]}
          >
            <TextArea rows={4} />
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
