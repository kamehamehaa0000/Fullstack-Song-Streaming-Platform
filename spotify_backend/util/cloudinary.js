import { v2 as cloudinary } from 'cloudinary'
import fs, { unlinkSync } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) {
      return null
    }
    //uploading
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto',
    })
    //deleting from server after upload
    await fs.unlink(localPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`)
      }
    })
    return response
  } catch (error) {
    await fs.unlink(localPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`)
      }
    }) //removes the locally save temp file as the upload operation gets failed
    console.log(error)
    return null
  }
}

const deleteFromCloudinary = async (url) => {
  try {
    const publicId = url.split('/').pop().split('.')[0] //extracting publicId from Url
    cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error(`Error deleting image from Cloudinary: ${error.message}`)
  }
}
export { uploadOnCloudinary, deleteFromCloudinary }
