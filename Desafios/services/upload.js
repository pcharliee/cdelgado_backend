import multer from 'multer';
import __dirname from '../utils.js';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/public/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;