if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routers = require('./routers/index')
const cors = require('cors')

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use('/', routers)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// module.exports = app