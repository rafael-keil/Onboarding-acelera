import helmet from 'helmet'

export const configureSecurity = app => {
  app.use(helmet())
}
