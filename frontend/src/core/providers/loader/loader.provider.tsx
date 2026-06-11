'use client'

import { IsLoadingProvider, useGlobalIsLoading } from '@core/global-state'

import { Loader } from '@ui/components'

const Loading = () => {
  const [isLoading] = useGlobalIsLoading()

  return <Loader loading={isLoading} />
}

export const LoaderProvider = ({ children }) => {
  return (
    <IsLoadingProvider>
      {children}
      <Loading />
    </IsLoadingProvider>
  )
}
