const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connected with database')
    } catch (e) {
        console.log(e.message)
    }
}
module.exports = connection