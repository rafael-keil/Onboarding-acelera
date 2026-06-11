import { Injectable } from '@nestjs/common'

const LOG_COLOR = {
  RED: '\x1b[31m%s\x1b[0m',
  YELLOW: '\x1b[33m%s\x1b[0m',
  MAGENTA: '\x1b[35m%s\x1b[0m',
  CYAN: '\x1b[36m%s\x1b[0m',
}

const LOG_LEVEL = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
}

const shouldBeMasked = [
  'apiKey',
  'cardId',
  'cardPassword',
  'confirmNewPassword',
  'cvv',
  'fingerprint',
  'jwtImage',
  'newPassword',
  'password',
  'senha',
  'authorization',
  'X-API-KEY',
]

@Injectable()
export class LoggerProvider {
  constructor() {}

  logExternalError(type, info) {
    this.log(type, LOG_LEVEL.ERROR, LOG_COLOR.MAGENTA, info)
  }

  logInternalError(info) {
    this.log('unknown', LOG_LEVEL.ERROR, LOG_COLOR.YELLOW, info)
  }

  logAPIError(info) {
    this.log('api-response', LOG_LEVEL.WARNING, LOG_COLOR.RED, info)
  }

  logAPIInfo(info) {
    this.log('api-info', LOG_LEVEL.INFO, LOG_COLOR.CYAN, info)
  }

  private log(type, level, color, info) {
    console.log(color, this.buildLog(type, level, info))
  }

  private maskFields(object) {
    if (Array.isArray(object)) {
      return object.map(arrayItem => this.maskFields(arrayItem))
    }
    if (!object || typeof object === 'string' || !Object.keys(object).length) {
      return object
    }
    return Object.keys(object).reduce((maskedObject, field) => {
      if (shouldBeMasked.includes(field)) {
        return {
          ...maskedObject,
          [field]: '[MASKED]',
        }
      } else if (Array.isArray(object[field])) {
        return {
          ...maskedObject,
          [field]: object[field].map(arrayItem => this.maskFields(arrayItem)),
        }
      } else if (typeof object[field] === 'object' && object[field] !== null) {
        return {
          ...maskedObject,
          [field]: this.maskFields(object[field]),
        }
      }
      return {
        ...maskedObject,
        [field]: object[field],
      }
    }, {})
  }

  private handleMaskFields(data) {
    try {
      if (typeof data === 'string') {
        return this.maskFields(JSON.parse(data))
      }

      return this.maskFields(data)
    } catch {
      return data
    }
  }

  private buildLog(type, level = LOG_LEVEL.ERROR, otherInfo) {
    return JSON.stringify({
      type,
      level,
      env: process.env.ACTIVE_ENV,
      service: process.env.npm_package_name,
      timestamp: new Date().toUTCString(),
      info: this.handleMaskFields(otherInfo),
    })
  }
}
