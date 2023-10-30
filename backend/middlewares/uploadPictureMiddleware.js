import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`);
    }
});


const uploadPicture = multer({
    storage: storage,
    limits: {
        fileSize: 1*1000000 // 1 mb
    },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== ".png" || ext !== ".jpg" || ext !== "jpeg") {
           return cb(new Error("Images are allowed"));
        }
        cb(null, true)
    }
})

export default uploadPicture;