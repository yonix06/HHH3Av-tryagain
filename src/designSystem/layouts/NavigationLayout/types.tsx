export type NavigationItem = {
  key: string
  label: string
  position: 'topbar' | 'leftbar' | 'leftbar-bottom'
  isVisible?: boolean
  onClick: () => void
  category?: string
}

export type ItemType = {
  key: string
  label: string
  position: 'topbar' | 'leftbar' | 'leftbar-bottom'
  isVisible?: boolean
  onClick: () => void
  category?: string
}
