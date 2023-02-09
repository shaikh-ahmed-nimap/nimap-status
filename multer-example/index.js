const path = require('node:path');
const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static('public'));

const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
}), fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(false)
    }
}})

app.post('/', upload.single('image'), (req, res) => {
    try {
            if (!req.file) {
                return res.status(400).json({message: "invalid file format"})
            }
            return res.status(201).json({file: req.file.originalname});
    } catch (err) {
        console.log(err);
        res.send('something went wrong')
    }
})

app.listen(5000);