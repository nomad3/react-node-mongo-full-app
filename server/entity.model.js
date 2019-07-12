const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Modelo
const entitiesModel = new Schema({
    topic: String,
    count: Number
},
{
    collection: 'conversation_returns'
})

module.exports = mongoose.model('conversation_returns', entitiesModel)
