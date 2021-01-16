const { response } = require("express")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const crud = require("./Models/crud")

mongoose.connect('mongodb://127.0.0.1:27017/songs', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    err ? console.log(err) : null
})

app.post("/:name", (req, res, next) => {
    var name = req.params.name
    const newCrud = new crud({
        _id: mongoose.Types.ObjectId(),
        name: name
    })
    newCrud.save()
        .then((response) => {
            res.status(200).json({
                status: 200,
                message: "Created Successfully",
                response: response
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: "Operation Failed",
                error: err
            })
        })
})

app.get("/:id", (req, res, next) => {
    crud.find({ _id: req.params.id }, { __v: 0 })
        .exec()
        .then(response => {
            console.log(response)
            res.status(200).json({
                response: response[0]
            })
        })
})

app.get("/", (req, res, next) => {
    crud.find({}, { __v: 0 })
        .exec()
        .then(response => {
            res.status(200).json({
                users: response
            })
        })
})

app.patch("/:id", (req, res, next) => {
    crud.findOneAndUpdate({ _id: req.params.id }, { $set: { name: "siddhant tiwary" } }, { new: true, useFindAndModify: true })
        .exec()
        .then(response => {
            res.status(200).json({
                response: response
            })
        })
        .catch(err => {
            res.status(500)
                .json({
                    error: err
                })
        })
})

app.delete("/:id",(req,res,next)=>{
    crud.remove({_id:req.params.id})
    .exec()
    .then(response=>{
        res.status(200).json({
            message: "Item deleted successfully",
            response
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

app.listen(3000)
