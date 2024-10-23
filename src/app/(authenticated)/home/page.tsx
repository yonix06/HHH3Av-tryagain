'use client'

import { Typography, Row, Col, Card, Calendar, List, Badge } from 'antd'
import {
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: documents } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: { documentRequests: true },
  })

  const { data: validations } = Api.validation.findMany.useQuery({
    where: { userId: user?.id },
  })

  const getListData = (value: dayjs.Dayjs) => {
    const listData =
      documents
        ?.flatMap(doc =>
          doc.documentRequests?.map(req => ({
            type: 'success',
            content: doc.name,
            date: dayjs(req.createdAt),
          })),
        )
        .filter(item => item?.date.isSame(value, 'day')) || []

    return listData
  }

  const dateCellRender = (value: dayjs.Dayjs) => {
    const listData = getListData(value)
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <PageLayout layout="full-width">
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
                <BarChartOutlined /> Analytics
              </>
            }
          >
            <Text>Total Documents: {documents?.length || 0}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <BellOutlined /> Notifications
              </>
            }
          >
            <Text>
              Pending:{' '}
              {documents?.filter(d =>
                d.documentRequests?.some(r => r.status === 'PENDING'),
              ).length || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <CheckCircleOutlined /> Validations
              </>
            }
          >
            <Text>
              To Review:{' '}
              {validations?.filter(v => v.status === 'PENDING').length || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <MessageOutlined /> Messages
              </>
            }
          >
            <Text>New Messages: 0</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={16}>
          <Card title="Calendar">
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Document Requests">
            <List
              dataSource={documents
                ?.flatMap(doc => doc.documentRequests || [])
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <Text>
                    {item.status}:{' '}
                    {documents?.find(d => d.id === item.documentId)?.name}
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
