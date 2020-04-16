const express = require('express');
const multer = require('multer');
const path = require('path');
var Tesseract = require('tesseract.js');

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
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

//Init App
const app = express();

// set view engine
app.set('view engine', 'ejs');

// static folder public
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {
    let keyword = req.query.keyword;
    res.json({ message: keyword })
})

app.post('/upload', upload.single('myImage'), (req, res) => {
    console.log(req.file);
    Tesseract.recognize(req.file.path, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
            res.json({ message: resStatus });
            console.log(text);
        })
        .catch(err => {
            res.json({ message: "Somthing Went Wrong!!" });
            console.log(err);
        })
})

// Listening to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));