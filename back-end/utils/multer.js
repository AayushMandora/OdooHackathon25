const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

const limits = {
    fileSize: 5 * 1024 * 1024 // 5 MB
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});

module.exports = {
    upload
}