import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { useDesignSystem } from '@/designSystem/provider'
import { MoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown, Flex, Menu, Tag, theme } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const { useToken } = theme

import { OrganizationSelect } from '../OrganizationSelect'

interface Props {
  keySelected?: string
  items: MenuProps['items']
}

export const Topbar: React.FC<Props> = ({ keySelected, items }) => {
  const router = useRouter()
  const { user, checkRole } = useUserContext()
  const { isMobile } = useDesignSystem()
  const [visibleItems, setVisibleItems] = useState<MenuProps['items']>([])
  const [overflowItems, setOverflowItems] = useState<MenuProps['items']>([])
  const { token } = useToken()

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.querySelector('.topbar-menu-container')?.clientWidth || 0
      let totalWidth = 0
      const newVisibleItems: MenuProps['items'] = []
      const newOverflowItems: MenuProps['items'] = []

      items?.forEach(item => {
        const itemWidth = 100 // Approximate width of each menu item
        if (totalWidth + itemWidth < containerWidth - 100) {
          // Leave space for overflow menu
          newVisibleItems.push(item)
          totalWidth += itemWidth
        } else {
          newOverflowItems.push(item)
        }
      })

      setVisibleItems(newVisibleItems)
      setOverflowItems(newOverflowItems)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [items])

  if (isMobile) {
    return <></>
  }

  const overflowMenu = (
    <Menu
      items={overflowItems}
      onClick={({ key }) => {
        const item = overflowItems?.find(i => i.key === key);
        if (item && 'onClick' in item) {
          (item.onClick as () => void)();
        }
      }}
    />
  )

  return (
    <>
      <Flex
        align="center"
        className="px-6 py-3"
        style={{
          width: '100%',
          backgroundColor: token.colorBgElevated,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Flex>
          <OrganizationSelect />
        </Flex>

        <Flex
          flex={1}
          className="topbar-menu-container mx-4"
          style={{ overflow: 'hidden' }}
        >
          <Menu
            mode="horizontal"
            items={visibleItems}
            selectedKeys={[keySelected]}
            style={{
              flex: 1,
              border: 'none',
              transition: 'all 0.3s ease',
            }}
            className="hover:text-blue-500 hover:-translate-y-0.5 transition-all duration-300"
          />
          {overflowItems.length > 0 && (
            <Dropdown overlay={overflowMenu} placement="bottomRight">
              <Menu
                mode="horizontal"
                style={{ border: 'none' }}
                items={[{ key: 'more', icon: <MoreOutlined /> }]}
              />
            </Dropdown>
          )}
        </Flex>

        <Flex align="center" gap="large">
          {checkRole('ADMIN') && (
            <Tag color="red" bordered={false}>
              Admin
            </Tag>
          )}

          {user && (
            <Avatar
              src={user.pictureUrl}
              alt={user.name}
              size="default"
              onClick={() => router.push('/profile')}
              style={{ cursor: 'pointer' }}
            >
              {Utility.stringToInitials(user.name)}
            </Avatar>
          )}
        </Flex>
      </Flex>
    </>
  )
}
