// import statement itu simpen paling atas

// karena menggunakan .env variable, jd lakuin import ini di awal aplikasi jalan
require('dotenv').config()

// import package2 yang kita gunakan di project kita ini
// notes : walau sudah di install, tetap harus import YGY
// baca2 config sama notes package yg kita pake ada di .txt YGY

const express = require('express')
// morgan itu logger
const morgan = require('morgan')
// import routing
const router = require('./routes')

const cors = require('cors')

const port = process.env.PORT
// inisialisasi setelah import statement
const app = express()
// basic express configurasi YGY
app.locals.moment = require('moment')
// Middleware to Parse JSON
app.use(express.json())
app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended:false }))

app.use(morgan('dev'))
app.use(router)

app.listen(port, () => {
    console.log(`Server running on ${Date(Date.now)}`)
    console.log(`Server listening on PORT: ${port}`)
})
