import { HTMLAttributes } from 'react'
import { LandingFooter } from './LandingFooter'
import { LandingNavBar } from './LandingNavBar/landing.navbar'

interface Props extends HTMLAttributes<HTMLElement> {
  navItems: {
    link: string
    title: string
    target?: '_blank'
  }[]
  children: React.ReactNode
}

export const LandingContainer: React.FC<Props> = ({
  navItems,
  children,
  ...props
}) => {
  return (
    <main {...props} className="dark">
      <div className={'bg-white text-black dark:bg-slate-900 dark:text-slate-200'}>
        <LandingNavBar navItems={navItems} />
        {children}

        <LandingFooter />
      </div>
    </main>
  )
}
