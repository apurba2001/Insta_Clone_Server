const AWS = require('aws-sdk')
const multer = require('multer')
require('dotenv').config()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage }).single('image')

const uploadToS3 = (req, res, next) => {
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${Date.now()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }
        req.body.image = data.Location
        next()
    })
    
}


module.exports = { upload, uploadToS3 }
