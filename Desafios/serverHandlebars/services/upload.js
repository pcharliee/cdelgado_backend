import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

export default upload;