import dotenv from 'dotenv'

const env: string = process.env.NODE_ENV ?? 'dev'
const envs: Record<string, string> = {
  dev: '.env',
  e2e: '.env.e2e'
}

const options: { path?: string } = {}

if (envs[env]) {
  options.path = envs[env]
}

dotenv.config(options)

export const config = {
  env,
  accessToken: process.env.MP_ACCESS_TOKEN ?? '',
  port: process.env.PORT ?? 3000,
  serverDomain: process.env.SERVER_DOMAIN ?? 'http://localhost:3000',
  integratorId: process.env.MP_INTEGRATOR_ID ?? undefined,
  siteDomain: process.env.SITE_DOMAIN ?? 'http://localhost:3000',
  gmail: {
    email: process.env.EMAIL,
    apiKey: process.env.APIKEY
  },
  mongodbUri: process.env.MONGODB_URI ?? ''
}

console.log(config)
