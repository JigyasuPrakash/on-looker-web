const express = require('express');
const multer = require('multer');
const path = require('path');
var Tesseract = require('tesseract.js');
const config = require('./config/database');
const mongoClient = require('mongodb').MongoClient;

const client = new mongoClient(config.database, { useUnifiedTopology: true, useNewUrlParser: true });

var resStatus = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const filertypes = /jpg|png/;
    const mime = /jpeg|jpg|png/;

    const extname = filertypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mime.test(file.mimetype);
    if (mimetype && extname) {
        resStatus = 'Uploaded Successfully!';
        return cb(null, true);
    } else {
        resStatus = 'File not Supported';
        return cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    dest: './public/uploads/',
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: fileFilter
});

//Init App
const app = express();

// set view engine
app.set('view engine', 'ejs');

// static folder public
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.get('/search', (req, res) => {
    var resURL = []
    let keyword = req.query.keyword.toLowerCase().split(" ").join("|");
    console.log(keyword)
    client.connect(err => {
        const collection = client.db('on_looker').collection('upload_image');
        console.log("Database connected successfully")
        collection.find({ data: { $regex: keyword } }).forEach(ele => {
            resURL.push(ele.url);
        }).then(() => {
            res.json({ url: resURL })
        })
    })
})

app.post('/upload', upload.single('myImage'), (req, res) => {
    console.log(req.file);
    Tesseract.recognize(req.file.path, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            client.connect(err => {
                const collection = client.db('on_looker').collection('upload_image');
                console.log("Database connected successfully")
                collection.insertOne({
                    url: req.file.path.substring(6),
                    data: text.toLowerCase()
                })
            })
            res.json({ message: resStatus });
            console.log(text);
        })
        .catch(err => {
            res.json({ message: "Somthing Went Wrong!!" });
            console.log(err);
        })
})

// Listening to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));