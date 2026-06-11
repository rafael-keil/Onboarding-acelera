'use client'

import { useContext, useEffect } from 'react'

import { getToken } from '@core/helpers'
import { api } from '@core/hooks/api'

import { KeycloakContext } from '..'

// segundos antes de expirar
const TOKEN_REFRESH_BEFORE_EXPIRATION = 60

const AxiosInterceptorsProvider = ({ children }) => {
  const keycloak = useContext(KeycloakContext)

  useEffect(() => {
    const refreshToken = async () => {
      if (!keycloak) return

      await keycloak?.updateToken(TOKEN_REFRESH_BEFORE_EXPIRATION)
    }

    const requestAuthorizationInterceptor = async requestConfig => {
      await refreshToken()

      const token = getToken()
      const bearerToken = `Bearer ${token}`

      requestConfig.headers.setAuthorization(bearerToken)

      return requestConfig
    }

    const interceptor = api.interceptors.request.use(requestAuthorizationInterceptor)

    return () => api.interceptors.request.eject(interceptor)
  }, [keycloak])

  return children
}

export { AxiosInterceptorsProvider }
