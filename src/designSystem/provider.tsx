'use client'

import { ConfigProvider } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MrbHtml } from './core'
import { Snackbar } from './providers/snackbar'
import './style/main.scss'
import { Theme } from './theme/theme'

export type DesignSystemContext = {
  isMobile: boolean
}

const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
})

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

const ProviderGeneral = ({ children }) => {
  const [isMobile, setMobile] = useState(false)

  const isWindow = typeof window !== 'undefined'

  useEffect(() => {
    if (!isWindow) {
      return
    }

    setMobile(window.innerWidth < 992)

    const handleResize = () => {
      setMobile(window.innerWidth < 992)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (!isWindow) {
        return
      }

      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const setVhVariable = () => {
      document.documentElement.style.setProperty(
        '--100vh',
        `${window.innerHeight}px`,
      )
    }

    setVhVariable()

    window.addEventListener('resize', setVhVariable)

    return () => window.removeEventListener('resize', setVhVariable)
  }, [])

  return (
    <ConfigProvider theme={Theme({})}>
      <DesignSystemContext.Provider value={{ isMobile }}>
        {children}
      </DesignSystemContext.Provider>
    </ConfigProvider>
  )
}

type Props = {
  children: ReactNode
}

export const DesignSystemProvider: React.FC<Props> = ({ children }) => {
  return (
    <ProviderGeneral>
      <MrbHtml>
        <Snackbar.Provider>{children}</Snackbar.Provider>
      </MrbHtml>
    </ProviderGeneral>
  )
}
