const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const { getEntities } = require('./entity.controller')

app.use(cors()) // Permite que hagan peticiones al servidor
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// endpoint, aqui se piden los datos a mongo
app.post('/', getEntities)

// Conexion a mongo, cambiar usuario y contraseña
mongoose.connect("mongodb://54.39.20.74:27017/fatvStats")
.then( () => {
    app.listen(4000, function(error){
        if(error){
            console.log(error)
        }
        else {
            console.log("Listening on http://localhost:4000")
        }
    })
})
.catch( error => {
    console.log(error)
})

// 'http://23.239.16.36:4000/'
