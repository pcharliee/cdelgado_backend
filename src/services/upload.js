import multer from 'multer';
import __dirname from '../utils.js';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const storageS3 = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET,
  metadata: function (req, file, callback) {
    callback(null, { fieldName: file.fieldname })
  },
  key: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname+'/public/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});



const upload = multer({ storage: storageS3 });

export default upload;
