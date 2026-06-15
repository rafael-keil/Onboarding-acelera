const ENV_ACTIVE_ENV = process.env.ACTIVE_ENV
const ENV_MONGO_URL = process.env.ENV_MONGO_URL
const ENV_REDIS_HOST = process.env.ENV_REDIS_HOST
const ENV_REDIS_PORT = parseInt(process.env.ENV_REDIS_PORT)
const ENV_REDIS_URL = `redis://${ENV_REDIS_HOST}:${ENV_REDIS_PORT}`
const ENV_JWT_SECRET = process.env.ENV_JWT_SECRET

export { ENV_ACTIVE_ENV, ENV_JWT_SECRET, ENV_MONGO_URL, ENV_REDIS_URL }
