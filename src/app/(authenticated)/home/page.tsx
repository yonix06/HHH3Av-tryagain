'use client'

import { Typography, Row, Col, Card, Calendar, List, Badge, theme } from 'antd'
import {
  BarChartOutlined,
  BellOutlined,
  CheckCircleOutlined,
  MessageOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { useToken } = theme
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { dummyDocuments, dummyValidations } from '@/utils/dummyData'

const useDocuments = () => {
  return { data: dummyDocuments }
}

const useValidations = () => {
  return { data: dummyValidations }
}

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { token } = useToken()
  const apiUtils = Api.useUtils()

  const { data: documents } = useDocuments()

  const { data: validations } = useValidations()

  type Document = {
    id: string;
    name: string;
    status: string;
    tags: string[];
    versions: Array<{
      id: string;
      versionNumber: number;
      content: string;
      createdAt: Date;
    }>;
  }

  const getListData = (value: dayjs.Dayjs) => {
    const listData = [
      ...documents?.flatMap((doc: Document) =>
        doc.versions.map(version => ({
          type: 'success',
          content: doc.name,
          date: dayjs(version.createdAt),
        }))
      ) || [],
      ...validations?.map(validation => ({
        type: validation.status === 'APPROVED' ? 'success' : validation.status === 'REJECTED' ? 'error' : 'warning',
        content: `Validation: ${validation.comment}`,
        date: dayjs(validation.createdAt),
      })) || [],
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

  const dateCellRender = (value: dayjs.Dayjs) => {
    const listData = getListData(value)
    return (
      <ul style={{ listStyle: 'none', padding: 0, maxHeight: '100px', overflowY: 'auto' }}>
        {listData.map((item, index) => (
          <li key={index} style={{ marginBottom: '2px' }}>
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
              }}
            />
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
                <BarChartOutlined style={{ color: token.colorPrimary }} /> Analytics
              </>
            }
            style={{ backgroundColor: token.colorBgContainer }}
          >
            <Text style={{ color: token.colorTextBase }}>Total Documents: {documents?.length || 0}</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <BellOutlined style={{ color: token.colorPrimary }} /> Notifications
              </>
            }
            style={{ backgroundColor: token.colorBgContainer }}
          >
            <Text style={{ color: token.colorTextBase }}>
              Pending: {documents?.filter((d: Document) => d.status === 'DRAFT').length || 0}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            title={
              <>
                <CheckCircleOutlined style={{ color: token.colorPrimary }} /> Validations
              </>
            }
            style={{ backgroundColor: token.colorBgContainer }}
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
                <MessageOutlined style={{ color: token.colorPrimary }} /> Messages
              </>
            }
            style={{ backgroundColor: token.colorBgContainer }}
          >
            <Text style={{ color: token.colorTextBase }}>New Messages: 0</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={16}>
          <Card title="Calendar" style={{ backgroundColor: token.colorBgContainer }}>
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Document Requests" style={{ backgroundColor: token.colorBgContainer }}>
            <List
              dataSource={documents
                ?.flatMap((doc: Document) => 
                  doc.versions.map(version => ({
                    status: doc.status,
                    createdAt: version.createdAt,
                    documentId: doc.id,
                    name: doc.name,
                    versionNumber: version.versionNumber
                  }))
                )
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .slice(0, 5)}
              renderItem={item => (
                <List.Item>
                  <Text style={{ color: token.colorTextBase }}>
                    {item.status}: {item.name} (v{item.versionNumber})
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
