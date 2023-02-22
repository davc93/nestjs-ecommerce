import express from 'express'
import cors from 'cors'
import { config } from './config'
import { sendEmail } from './mail'
import { errors } from './network/errors'
import preferences from './routes/preference'
import notifications from './routes/notifications'
import { dbConnection } from './db/mongo'

export const createApp = async () => {
  await dbConnection()
  const app = express()

  app.set('trust proxy', true)
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res, next) => {
    res.send('Hello world')
  })
  app.use('/api/create_preference', preferences)
  app.use('/api/notification_url', notifications)
  app.use(errors)
  return app
}
