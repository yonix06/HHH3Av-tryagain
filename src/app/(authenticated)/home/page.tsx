'use client'

import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Prisma } from '@prisma/client'
import {
  Badge,
  Calendar,
  CalendarProps,
  Card,
  Col,
  List,
  Row,
  Spin,
  Typography,
  theme,
} from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'
const { Title, Text } = Typography
const { useToken } = theme

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { token } = useToken()
  const apiUtils = Api.useUtils()

  const {
    data: documents,
    isLoading: isLoadingDocuments,
    error: documentsError,
  } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: {
      documentVersions: true,
      documentTags: { include: { tag: true } },
      status: true,
    },
  })

  const {
    data: validations,
    isLoading: isLoadingValidations,
    error: validationsError,
  } = Api.validation.findMany.useQuery({})

  useEffect(() => {
    if (documentsError) {
      enqueueSnackbar('Error fetching documents', { variant: 'error' })
    }
    if (validationsError) {
      enqueueSnackbar('Error fetching validations', { variant: 'error' })
    }
  }, [documentsError, validationsError, enqueueSnackbar])

  useEffect(() => {
    if (documents?.some(d => !d.status)) {
      enqueueSnackbar('Some documents have invalid status', {
        variant: 'warning',
      })
    }
  }, [documents, enqueueSnackbar])

  type Document = Prisma.DocumentGetPayload<{
    include: {
      documentVersions: true
      documentTags: {
        include: {
          tag: true
        }
      }
      status: true
    }
  }>

  const getListData = (value: Dayjs) => {
    if (!documents || !validations) return []

    const listData = [
      ...documents.flatMap((doc: Document) =>
        doc.documentVersions.map(version => ({
          type: 'success',
          content: doc.name,
          date: dayjs(version.createdAt),
        })),
      ),
      ...validations.map(validation => ({
        type:
          validation.status === 'APPROVED'
            ? 'success'
            : validation.status === 'REJECTED'
              ? 'error'
              : 'warning',
        content: `Validation: ${validation.comment}`,
        date: dayjs(validation.createdAt),
      })),
      {
        type: 'error',
        content: 'Urgent: Team Meeting',
        date: dayjs().add(1, 'day'),
      },
      {
        type: 'warning',
        content: 'Deadline: Project Submission',
        date: dayjs().add(3, 'days'),
      },
    ].filter(item => item.date.isSame(value, 'day'))

    return listData
  }

  const dateCellRender: CalendarProps<Dayjs>['dateCellRender'] = value => {
    const listData = getListData(value)
    return (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          maxHeight: '60px',
          overflowY: 'auto',
        }}
      >
        {listData.map((item, index) => (
          <li key={index} style={{ marginBottom: '1px' }}>
            <Badge
              status={item.type as any}
              text={item.content}
              style={{
                color: token.colorTextBase,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                display: 'block',
                fontSize: '0.7em',
              }}
            />
          </li>
        ))}
      </ul>
    )
  }

  if (isLoadingDocuments || isLoadingValidations) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>
        Welcome to your personalized dashboard. Here's an overview of your
        activities and important information.
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <BarChartOutlined style={{ color: token.colorPrimary }} />{' '}
                Analytics
              </>
            }
            style={{
              backgroundColor: token.colorBgContainer,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/analytics')}
          >
            <Text style={{ color: token.colorTextBase }}>
              Total Documents:{' '}
              {documents?.reduce(
                (acc, doc) => acc + doc.documentVersions.length,
                0,
              ) || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <BellOutlined style={{ color: token.colorPrimary }} />{' '}
                Notifications
              </>
            }
            style={{
              backgroundColor: token.colorBgContainer,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/notifications')}
          >
            <Text style={{ color: token.colorTextBase }}>
              Pending:{' '}
              {documents?.filter((d: Document) => d.status?.name === 'DRAFT')
                .length || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <CheckCircleOutlined style={{ color: token.colorPrimary }} />{' '}
                Validations
              </>
            }
            style={{
              backgroundColor: token.colorBgContainer,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/validations')}
          >
            <Text style={{ color: token.colorTextBase }}>
              To Review:{' '}
              {validations?.filter(v => v.status === 'PENDING').length || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <MessageOutlined style={{ color: token.colorPrimary }} />{' '}
                Messages
              </>
            }
            style={{
              backgroundColor: token.colorBgContainer,
              cursor: 'pointer',
            }}
            onClick={() => router.push('/messages')}
          >
            <Text style={{ color: token.colorTextBase }}>New Messages: 0</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={12}>
          <Card
            title="Calendar"
            style={{ backgroundColor: token.colorBgContainer, height: '500px' }}
          >
            <Calendar fullscreen={false} dateCellRender={dateCellRender} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Recent Document Requests"
            style={{
              backgroundColor: token.colorBgContainer,
              height: '500px',
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <List
              dataSource={documents
                ?.flatMap((doc: Document) =>
                  doc.documentVersions.map(version => ({
                    status: doc.status,
                    createdAt: version.createdAt,
                    documentId: doc.id,
                    name: doc.name,
                    versionNumber: version.versionNumber,
                  })),
                )
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .slice(0, 5)}
              renderItem={item => (
                <List.Item
                  onClick={() => router.push(`/documents/${item.documentId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text style={{ color: token.colorTextBase }}>
                    {item.status?.name}: {item.name} (v{item.versionNumber})
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
