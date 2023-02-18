const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const p = path.join(__dirname, '../public/images');
        cb(null, p);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, req.user.email.split('@')[0] + ext)
    }
});

const upload = multer({storage: storage});

module.exports = upload;