import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

import { THEME } from '@ui/styles/theme/theme'

import { AnalyticsProvider } from './analytics/analytics.provider'
import { AxiosInterceptorsProvider } from './axios-interceptors/axios-interceptors.provider'
import { FirebaseProvider } from './firebase/firebase.provider'
import { KeycloakProvider } from './keycloak/keycloak.provider'
import { LoaderProvider } from './loader/loader.provider'
import { NotificationProvider } from './notification/notification.provider'
import { RemoteConfigProvider } from './remote-config/remote-config.provider'

const Providers = ({ children }) => (
  <AppRouterCacheProvider options={{ prepend: true, enableCssLayer: true }}>
    <StyledEngineProvider injectFirst>
      <NotificationProvider>
        <ThemeProvider theme={THEME}>
          <FirebaseProvider>
            <RemoteConfigProvider>
              <AnalyticsProvider>
                <KeycloakProvider>
                  <AxiosInterceptorsProvider>
                    <LoaderProvider>{children}</LoaderProvider>
                  </AxiosInterceptorsProvider>
                </KeycloakProvider>
              </AnalyticsProvider>
            </RemoteConfigProvider>
          </FirebaseProvider>
        </ThemeProvider>
      </NotificationProvider>
    </StyledEngineProvider>
  </AppRouterCacheProvider>
)

export { Providers }
