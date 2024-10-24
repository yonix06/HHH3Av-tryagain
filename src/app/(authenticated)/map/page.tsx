'use client'

import { useEffect, useRef, useState } from 'react'
import { Typography, Select, Space, Card } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import MapboxGeocoder, {
  GeocodeService,
} from '@mapbox/mapbox-sdk/services/geocoding'
import mapboxgl, { LngLatLike, Map } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const { Title, Text } = Typography
const { Option } = Select
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CartographyPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const mapContainer = useRef(null)
  const [geocodingClient, setGeocodingClient] = useState<GeocodeService>()
  const [map, setMap] = useState<Map>()
  const [tags, setTags] = useState<any[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [documents, setDocuments] = useState<any[]>([])

  const { data: secrets } = Api.configuration.getPublic.useQuery()
  const { data: tagsData } = Api.tag.findMany.useQuery({
    where: { organizationId: organization?.id },
  })
  const { data: documentsData } = Api.document.findMany.useQuery({
    where: { organizationId: organization?.id },
    include: {
      documentTags: { include: { tag: true } },
      documentVersions: { include: { validations: true } },
    },
  })

  useEffect(() => {
    if (tagsData) setTags(tagsData)
    if (documentsData) setDocuments(documentsData)
  }, [tagsData, documentsData])

  useEffect(() => {
    const accessToken = secrets?.['PUBLIC_MAPBOX_ACCESS_TOKEN']
    if (!accessToken) return

    mapboxgl.accessToken = accessToken
    const geocodingClient = MapboxGeocoder(mapboxgl)
    setGeocodingClient(geocodingClient)

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
    })

    setMap(map)

    return () => map.remove()
  }, [secrets])

  useEffect(() => {
    if (!map || !documents) return

    map.on('load', () => {
      documents.forEach(doc => {
        const latestVersion =
          doc.documentVersions[doc.documentVersions.length - 1]
        const isValidated = latestVersion.validations.some(
          v => v.status === 'APPROVED',
        )
        if (!isValidated) return

        const shouldDisplay =
          selectedTags.length === 0 ||
          doc.documentTags.some(dt => selectedTags.includes(dt.tag.id))

        if (!shouldDisplay) return

        geocodingClient
          ?.forwardGeocode({
            query: doc.name,
            limit: 1,
          })
          .send()
          .then(response => {
            const match = response.body
            if (match.features.length > 0) {
              const coordinates = match.features[0].center
              new mapboxgl.Marker()
                .setLngLat(coordinates as LngLatLike)
                .setPopup(
                  new mapboxgl.Popup().setHTML(
                    `<h3>${doc.name}</h3><p>${doc.description || ''}</p>`,
                  ),
                )
                .addTo(map)
            }
          })
      })
    })
  }, [map, documents, selectedTags, geocodingClient])

  const handleTagChange = (value: string[]) => {
    setSelectedTags(value)
  }

  return (
    <PageLayout layout="full-width">
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space align="center">
            <EnvironmentOutlined style={{ fontSize: '24px' }} />
            <Title level={2} style={{ margin: 0 }}>
              Document Cartography
            </Title>
          </Space>
          <Text>
            View a map visualization of metadata from validated documents.
          </Text>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Filter by document tags"
            onChange={handleTagChange}
          >
            {tags?.map(tag => (
              <Option key={tag.id} value={tag.id}>
                {tag.name}
              </Option>
            ))}
          </Select>
          <div ref={mapContainer} style={{ height: '500px', width: '100%' }} />
        </Space>
      </Card>
    </PageLayout>
  )
}
