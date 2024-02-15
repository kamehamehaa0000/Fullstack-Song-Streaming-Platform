import mongoose from 'mongoose'
import { dbName } from './constant.js'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOURI}/${dbName}`
    )
    console.log('MONGODB Connected', connectionInstance.connection.host)
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    throw error
  }
}

export default connectDB
