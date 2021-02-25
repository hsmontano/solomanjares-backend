const express = require('express')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const uuid = require('uuid').v4
const path = require('path')
const cors = require('cors')
const app = express()
const port = 3000

//middlewares
app.use('/images', express.static(__dirname + '/images'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//middlewares para subir imagenes...
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/images'),
    filename: (request, file, callback, filename) => {
        callback(null, uuid() + path.extname(file.originalname))
    }
})
app.use(multer({ storage }).single('image'))
//middlewares
app.use(cors())
app.use(routes)

//conexión
mongoose.connect('mongodb://localhost/manjares_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection

if (!db) {
    console.log('Error en la base de datos');
} else {
    console.log('Conexion exitosa!');
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})