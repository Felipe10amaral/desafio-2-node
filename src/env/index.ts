import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3330),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variable error', _env.error.format())
  throw new Error('Invalid environment variable ')
}

export const env = _env.data
