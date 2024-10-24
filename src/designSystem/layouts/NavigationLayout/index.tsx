import { useUserContext } from '@/core/context'
import { Flex } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
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
      label: '🖥️ Dashboard',
      position: 'topbar',
      category: 'General',
      onClick: () => goTo('/home'),
    },
    {
      key: '/',
      label: '👾 Landing Page',
      position: 'topbar',
      category: 'General',
      onClick: () => goTo('/'),
    },
    {
      key: '/documents',
      label: '📄 Management de Documents',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents'),
    },
    {
      key: '/request-document',
      label: '🥁 Requêtes',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/request-document'),
    },
    {
      key: '/map',
      label: '🗺️ Cartographie',
      position: 'leftbar',
      category: 'Outils',
      onClick: () => goTo('/map'),
    },
    {
      key: '/email',
      label: '📧 Diffusion par Email',
      position: 'leftbar',
      category: 'Outils',
      onClick: () => goTo('/email'),
    },
    {
      key: '/admin',
      label: '🐧 Admin control panel',
      position: 'leftbar',
      category: 'Administration',
      onClick: () => goTo('/admin'),
    },
    {
      key: '/documents/validate',
      label: '✅ Validation de Documents',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents/validate'),
    },
    {
      key: '/documents/archive',
      label: '🔎 Recherche',
      position: 'leftbar',
      category: 'Documents',
      onClick: () => goTo('/documents/archive'),
    },
    {
      key: '/organizations/:organizationId/pricing',
      label: '💸 Facturation',
      position: 'leftbar',
      category: '€',
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

  const groupedItems = itemsVisible.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ItemType[]>,
  )

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
