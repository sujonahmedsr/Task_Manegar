import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dvjeaplel',
    api_key: '965318298626492',
    api_secret: 'JjK7nxRbUadlYJ4IesuGh1QKw9Q'
});

export const sendImgToCloudinary = (imgName: string, file: string): Promise<Record<string, unknown>> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, { public_id: imgName.trim() },
            (error, result) => {
                fs.unlinkSync(file)
                if (error) {
                    reject(error)
                } resolve(result as UploadApiResponse )
            }
        )
    })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        const fileType = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileType, " ").toLowerCase().split(" ").join("-") + Date.now()
        cb(null, fileName + fileType)
    }
})

export const upload = multer({ storage: storage })