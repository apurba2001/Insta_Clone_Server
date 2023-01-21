const express = require('express')
const cors = require('cors')
const posts = require('./models/posts')
const { upload, uploadToS3 } = require('./middlewares/uploads')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/posts', async (req, res) => {
    const data = await posts.find().sort({ "_id": -1 })
    res.status(200).json(data)
})

app.post('/create-post', upload, uploadToS3, async (req, res) => {
    console.log('okey done')
    console.log(req.body)
    const date = String(Date()).slice(4, 16)
    const likes = Math.ceil(Math.random() * 100)
    try {
        await posts.create({ ...req.body, date, likes })
        res.status(302).redirect('/posts')
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post");
    }
})

module.exports = app