const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({
    _id:String,
    name:{type: String}
})

module.exports= mongoose.model('crud',dataSchema)