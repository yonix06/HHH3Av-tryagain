import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Api } from '../../trpc'

import {
  OrganizationContextType,
  useOrganizationContext,
} from './useOrganizationContext'

/**
 * @provider useUserContext
 * @description A provider to get the relevant user context
 * @attribute {boolean} isLoggedIn - Wether the user is authenticated or not
 * @attribute {User} user - The user object. user.id to access the id for example
 * @attribute {(roleName: string) => boolean} checkOrganizationRole - Check if the logged user match the role name in the organization
 * @attribute {Organization} organization - The current organization of the user. You should use the organization id from the router params as much as possible but you can get the organization id from this object too.
 * @attribute {OrganizationRole[]} organizationRoles - The current organization roles (owner or member) of the user within the current organization
 * @attribute {Organizations} organizations - All the organizations of the user
 * @usage  add 'const { user, organization, organizations, organizationRoles, checkOrganizationRole } = useUserContext()' , then you can access the id, name, email like that 'const userId = user?.id'
 * @import import { useUserContext } from '@/core/context'
 */

type AuthenticationStatus = 'unauthenticated' | 'loading' | 'authenticated'

interface UserContextType extends OrganizationContextType {
  user: User | null
  checkRole: (roleName: string) => boolean
  refetch: () => void
  authenticationStatus: AuthenticationStatus
  isLoggedIn: boolean
  isLoading: boolean
}

const UserContext = createContext<UserContextType>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession()

  const [user, setUser] = useState<User>(null)

  const organizationsData = useOrganizationContext({ user })

  const isLoggedIn = status === 'authenticated'

  const { refetch, isLoading: isLoadingUser } = Api.user.findFirst.useQuery(
    {
      where: { id: data?.user?.id },
    },
    {
      enabled: false,
      onSuccess: user => {
        setUser(user)
      },
    },
  )

  const checkRole = (roleName: string) => {
    return !!(user?.globalRole === roleName)
  }

  const isLoading =
    status === 'loading' || (status === 'authenticated' && isLoadingUser)

  useEffect(() => {
    if (status === 'authenticated') {
      refetch()
    }
  }, [status])

  return (
    <UserContext.Provider
      value={{
        user,
        checkRole,
        refetch,
        authenticationStatus: status,
        isLoggedIn,
        isLoading,

        ...organizationsData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
