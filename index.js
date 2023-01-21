const app = require('./app')
const dbConnect = require('./dbConnect')
const port = process.env.PORT || 5001

dbConnect()

app.listen(port, () => console.log(`Server is running on ${port}`))