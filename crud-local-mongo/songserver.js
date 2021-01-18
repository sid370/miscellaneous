const express = require("express")
const app = express()
const multer = require("multer")
const morgan = require("morgan")
const GridFsStorage = require("multer-gridfs-storage")
const Grid = require("gridfs-stream")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(morgan('dev'))
app.use(bodyParser.json())

const MongoURI = 'mongodb://127.0.0.1:27017/songLibrary'

const conn = mongoose.createConnection(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

let gfs, fname;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})

const storage = new GridFsStorage({
    url: MongoURI,
    file: (req, file) => {
        fname = file
        return new Promise((resolve, reject) => {
            filename = file.originalname
            const fileinfo = {
                filename,
                bucketname: 'fs'
            }
            resolve(fileinfo)
        })
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "audio/mpeg") cb(null, true)
        else {
            cb(null, false)
            return cb(new Error("Only audio files supported"))
        }
    }
}).single('file')

app.post("/upload", (req, res) => {
    upload(req, res, err => {
        if (err) return res.status(500).json({err})
        res.status(200).json({
            status: "file uploaded",
            note: "if mimetype is not supported, your upload will be automatically rejected"
        })
    })
})

app.get("/", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files)
    })
})

app.get("/:id", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (err) return res.json(err)
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file found'
            })
        }
        var id = req.params.id
        id = id.toString()
        for (i = 0; i < files.length; i++) {
            var fileId = files[i]._id
            fileId = fileId.toString()
            if (fileId === id) {
                console.log("Match found")
                res.status(200).json(files[i])
            }
        }
    })
})

app.get('/file/:id', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (err) return res.json(err)
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file found'
            })
        }
        var id = req.params.id
        id = id.toString()
        for (i = 0; i < files.length; i++) {
            var fileId = files[i]._id
            fileId = fileId.toString()
            if (fileId === id) {
                var readStream = gfs.createReadStream({ filename: files[i].filename })
                readStream.pipe(res)
            }
        }
    })
})

app.delete('/:id', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (err) return res.json(err)
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file found'
            })
        }
        var id = req.params.id
        id = id.toString()
        for (i = 0; i < files.length; i++) {
            var fileId = files[i]._id
            fileId = fileId.toString()
            if (fileId === id) {
                gfs.remove({ filename: files[i].filename }, (err) => {
                    err ? res.status(500).json(err) : null
                    res.status(200).json({
                        message: "file deleted"
                    })
                })
            }
        }
    })
})
app.listen(8080)
