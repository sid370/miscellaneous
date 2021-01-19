const mongoose = require("mongoose")

const dataSchema = mongoose.Schema({
    _id: { type: String },
    name: { type: String }
})

module.exports = mongoose.model('songdb', dataSchema)