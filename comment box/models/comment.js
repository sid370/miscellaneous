const mongoose = require("mongoose")

const schema = mongoose.Schema

const commentSchema = new schema({
    username: {type: String, required: true},
    comment: {type: String,required: true},
},{timestamps: true})

const Comment = mongoose.model('Comment',commentSchema)
module.exports=Comment