import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Mobilebar } from './components/Mobilebar'
import { Topbar } from './components/Topbar'
import { NavigationItem } from './types'

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

  const items: NavigationItem[] = [
    {
      key: '/home',
      label: 'Home Page',
      position: 'leftbar',

      onClick: () => goTo('/home'),
    },

    {
      key: '/documents',
      label: 'Document Management',
      position: 'leftbar',

      onClick: () => goTo('/documents'),
    },

    {
      key: '/request-document',
      label: 'Document Request',
      position: 'leftbar',

      onClick: () => goTo('/request-document'),
    },

    {
      key: '/map',
      label: 'Cartography',
      position: 'leftbar',

      onClick: () => goTo('/map'),
    },

    {
      key: '/email',
      label: 'Email Composer',
      position: 'leftbar',

      onClick: () => goTo('/email'),
    },

    {
      key: '/admin',
      label: 'Admin Panel',
      position: 'leftbar',

      onClick: () => goTo('/admin'),
    },

    {
      key: '/documents/validate',
      label: 'Document Validation',
      position: 'leftbar',

      onClick: () => goTo('/documents/validate'),
    },

    {
      key: '/documents/archive',
      label: 'Archive',
      position: 'leftbar',

      onClick: () => goTo('/documents/archive'),
    },

    {
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',

      position: 'leftbar',

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
      onClick: item.onClick,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')

  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')

  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )

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
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar}
          itemsBottom={itemsLeftbottom}
        />

        <Flex flex={1} vertical style={{ overflowY: 'hidden' }}>
          {children}
        </Flex>
      </Flex>
    </>
  )
}
