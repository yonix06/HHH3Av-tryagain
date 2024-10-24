'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Input,
  Button,
  Tag,
  Space,
  Select,
  Spin,
  Modal,
} from 'antd'
import { SaveOutlined, HistoryOutlined, TagOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentEditorPage() {
  const router = useRouter()
  const params = useParams<{ documentId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const { mutateAsync: upload } = useUploadPublic()

  const [content, setContent] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isVersionModalVisible, setIsVersionModalVisible] = useState(false)

  const { data: document, isLoading: isDocumentLoading, refetch: refetchDocument } =
    Api.document.findUnique.useQuery({
      where: { id: params.documentId },
      include: {
        documentVersions: true,
        documentTags: { include: { tag: true } },
        user: true,
      },
    })

  const { data: availableTags } = Api.tag.findMany.useQuery({})

  const updateDocumentMutation = Api.document.update.useMutation()
  const createDocumentVersionMutation = Api.documentVersion.create.useMutation()
  const createDocumentTagMutation = Api.documentTag.create.useMutation()
  const deleteDocumentTagMutation = Api.documentTag.delete.useMutation()

  useEffect(() => {
    if (document) {
      setName(document.name)
      setDescription(document.description || '')
      setTags(document.documentTags.map(dt => dt.tag.name))
      const latestVersion =
        document.documentVersions[document.documentVersions.length - 1]
      if (latestVersion && latestVersion.url) {
        fetch(latestVersion.url)
          .then(response => response.text())
          .then(text => setContent(text))
      }
    }
  }, [document])

  const handleSave = async () => {
    try {
      const file = new File([content], 'document.html', { type: 'text/html' });
      const newVersionNumber = (document?.documentVersions.length || 0) + 1;
      const newUrl = `/documents/${params.documentId}/versions/${newVersionNumber}`;
      const uploadResult = await upload({ file, path: newUrl });
      await updateDocumentMutation.mutateAsync({
        where: { id: params.documentId },
        data: { name, description },
      })
      await createDocumentVersionMutation.mutateAsync({
        data: {
          documentId: params.documentId,
          url: uploadResult.url,
          versionNumber: newVersionNumber,
        },
      })
      enqueueSnackbar('Document saved successfully', { variant: 'success' })
      refetchDocument()
    } catch (error) {
      enqueueSnackbar('Error saving document', { variant: 'error' })
    }
  }

  const handleTagChange = async (newTags: string[]) => {
    try {
      const tagsToAdd = newTags.filter(t => !tags.includes(t))
      const tagsToRemove = tags.filter(t => !newTags.includes(t))

      for (const tagName of tagsToAdd) {
        const tagId = availableTags?.find(t => t.name === tagName)?.id
        if (tagId) {
          await createDocumentTagMutation.mutateAsync({
            data: { documentId: params.documentId, tagId },
          })
        }
      }

      for (const tagName of tagsToRemove) {
        const documentTag = document?.documentTags.find(
          dt => dt.tag.name === tagName,
        )
        if (documentTag) {
          await deleteDocumentTagMutation.mutateAsync({
            where: { id: documentTag.id },
          })
        }
      }

      setTags(newTags)
      enqueueSnackbar('Tags updated successfully', { variant: 'success' })
      refetchDocument()
    } catch (error) {
      enqueueSnackbar('Error updating tags', { variant: 'error' })
    }
  }

  const handleVersionRevert = async (versionNumber: number) => {
    const version = document?.documentVersions.find(
      v => v.versionNumber === versionNumber,
    )
    if (version && version.url) {
      try {
        const response = await fetch(version.url)
        const text = await response.text()
        setContent(text)
        setIsVersionModalVisible(false)
        enqueueSnackbar(`Reverted to version ${versionNumber}`, {
          variant: 'info',
        })
      } catch (error) {
        enqueueSnackbar('Error reverting version', { variant: 'error' })
      }
    }
  }

  if (isDocumentLoading) {
    return (
      <PageLayout layout="full-width">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={2}>Document Editor</Title>
        <Text>Edit your document and manage its versions and tags.</Text>

        <Input
          placeholder="Document Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Input.TextArea
          placeholder="Document Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="Select tags"
          value={tags}
          onChange={handleTagChange}
          options={availableTags?.map(tag => ({
            value: tag.name,
            label: tag.name,
          }))}
        />

        <Editor
          apiKey="your-tinymce-api-key"
          value={content}
          onEditorChange={setContent}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
          }}
        />

        <Space>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => setIsVersionModalVisible(true)}
          >
            View Versions
          </Button>
        </Space>

        {document && (
          <Text>
            Last modified by {document.user?.name || 'Unknown'} on{' '}
            {dayjs(document.updatedAt).format('MMMM D, YYYY HH:mm')}
          </Text>
        )}
      </Space>

      <Modal
        title="Document Versions"
        visible={isVersionModalVisible}
        onCancel={() => setIsVersionModalVisible(false)}
        footer={null}
      >
        {document?.documentVersions.map(version => (
          <div key={version.id} style={{ marginBottom: 16 }}>
            <Text>Version {version.versionNumber.toString()} - </Text>
            <Text>{dayjs(version.createdAt).format('MMMM D, YYYY HH:mm')}</Text>
            <Button
              size="small"
              style={{ marginLeft: 8 }}
              onClick={() => handleVersionRevert(version.versionNumber)}
            >
              Revert
            </Button>
          </div>
        ))}
      </Modal>
    </PageLayout>
  )
}
