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

const conn = mongoose.createConnection(MongoURI)

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

const upload = multer({ storage })
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json({
        status: "file uploaded"
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

app.listen(8080)
