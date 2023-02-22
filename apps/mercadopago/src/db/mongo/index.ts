import mongoose from 'mongoose'
import { config } from '../../config'

async function dbConnection () {
  try {
    await mongoose.connect(config.mongodbUri)
    console.log('[mongodb]: connection succesfull')
  } catch (error) {
    console.log(`[mongodb]: connection problems ${error}`)
  }
}

export {
  dbConnection
}
