import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { config } from "dotenv";
config()

cloudinary.config({
    cloud_name: process.env.C_CLOUD_NAME,
    api_key: process.env.C_API_KEY,
    api_secret: process.env.C_API_SECRET
})

export const avatarCloud = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "AirBnb Avatar"
        }
    })
})

export const coverCloud = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "AirBnb Cover"
        }
    })
})