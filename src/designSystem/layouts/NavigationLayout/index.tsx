import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { ItemType } from './types'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params: Record<string, string> = useParams()

  const { organization } = useUserContext()

  const goTo = (url: string) => {
    router.push(url)
  }

  const items: ItemType[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'topbar',
      category: 'General',
      onClick: () => goTo('/home'),
    },
    {
      key: '/documents',
      label: 'Document Management',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents'),
    },
    {
      key: '/request-document',
      label: 'Document Request',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/request-document'),
    },
    {
      key: '/map',
      label: 'Cartography',
      position: 'leftbar',
      category: 'Tools',
      onClick: () => goTo('/map'),
    },
    {
      key: '/email',
      label: 'Email Composer',
      position: 'leftbar',
      category: 'Tools',
      onClick: () => goTo('/email'),
    },
    {
      key: '/admin',
      label: 'Admin Panel',
      position: 'leftbar',
      category: 'Admin',
      onClick: () => goTo('/admin'),
    },
    {
      key: '/documents/validate',
      label: 'Document Validation',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents/validate'),
    },
    {
      key: '/documents/archive',
      label: 'Archive',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents/archive'),
    },
    {
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',
      position: 'leftbar',
      category: 'Organization',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/pricing'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      key: item.key,
      label: item.label,
      position: item.position,
      category: item.category,
      onClick: item.onClick,
    }))

  const groupedItems = itemsVisible.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, ItemType[]>)

  const itemsTopbar = Object.entries(groupedItems).map(([category, items]) => ({
    key: category,
    label: category,
    children: items,
  }))

  const itemsMobile = itemsVisible

  let keySelected = pathname

  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  return (
    <>
      <Topbar keySelected={keySelected} items={itemsTopbar} />

      <Mobilebar keySelected={keySelected} items={itemsMobile} />

      <Flex flex={1} style={{ overflowY: 'hidden' }}>
        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
