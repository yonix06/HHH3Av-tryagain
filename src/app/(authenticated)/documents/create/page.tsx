'use client'

import { useState } from 'react'
import { Typography, Form, Input, Button, Card, Row, Col } from 'antd'
import { useUserContext } from '@/core/context'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Prisma } from '@prisma/client'

const { Title, Text } = Typography

export default function CreateDocumentPage() {
  const router = useRouter()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const { data: templates, isLoading: isLoadingTemplates } = Api.documentTemplate.findMany.useQuery({
    where: organization?.id ? { organizationId: organization.id } : {},
  })

  const handleCreateDocument = async (values) => {
    try {
      const newDocument = await createDocument({
        data: {
          ...values,
          user: { connect: { id: user?.id } },
          organization: organization?.id ? { connect: { id: organization.id } } : undefined,
        }
      })
      enqueueSnackbar('Document created successfully', { variant: 'success' })
      router.push(`/documents/${newDocument.id}/edit`)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error:', error.message, error.code)
        enqueueSnackbar(`Failed to create document: ${error.message}`, { variant: 'error' })
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error('Prisma validation error:', error.message)
        enqueueSnackbar(`Validation error: ${error.message}`, { variant: 'error' })
      } else if (error instanceof Prisma.PrismaClientInitializationError) {
        console.error('Prisma initialization error:', error.message)
        enqueueSnackbar('Database connection error', { variant: 'error' })
      } else {
        console.error('Unknown error:', error)
        enqueueSnackbar('An unexpected error occurred', { variant: 'error' })
      }
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create New Document</Title>
      <Text>Fill in the details to create a new document.</Text>

      <Form form={form} onFinish={handleCreateDocument} layout="vertical" style={{ marginTop: '20px' }}>
        <Form.Item
          name="name"
          label="Document Name"
          rules={[{ required: true, message: 'Please input the document name!' }]}
        >
          <Input placeholder="Enter document name" />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Enter document description" />
        </Form.Item>

        <Form.Item label="Select Template">
          <Row gutter={[16, 16]}>
            {isLoadingTemplates ? (
              <Col><Text>Loading templates...</Text></Col>
            ) : templates && templates.length > 0 ? (
              templates.map((template) => (
                <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
                  <Card
                    hoverable
                    onClick={() => handleTemplateSelect(template.id)}
                    style={{ 
                      borderColor: selectedTemplate === template.id ? '#1890ff' : undefined,
                      backgroundColor: selectedTemplate === template.id ? '#e6f7ff' : undefined 
                    }}
                  >
                    <Card.Meta
                      title={template.name}
                      description={template.description}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <Col><Text>No templates available</Text></Col>
            )}
          </Row>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Document
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
