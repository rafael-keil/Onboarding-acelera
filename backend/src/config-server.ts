import {
  configureCors,
  configureExceptionFilter,
  configureParameterProcessing,
  configureRequestBodyLimit,
  configureSecurity,
  configureSwagger,
  configureValidationPipe,
} from '@config'

export const configureServer = app => {
  configureExceptionFilter(app)
  configureSecurity(app)
  configureValidationPipe(app)
  configureSwagger({ app, title: 'Backend Onboarding Acelera', version: '1.0.0' })
  configureRequestBodyLimit(app)
  configureCors(app)
  configureParameterProcessing(app)
}
