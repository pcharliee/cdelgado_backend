import multer from 'multer';
import __dirname from '../utils.js';
import config from '../config.js';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

const s3 = new AWS.S3({
  accessKeyId: config.aws.ACCESS_KEY_ID, 
  secretAccessKey: config.aws.SECRET_ACCESS_KEY
});

const storageS3 = multerS3({
  s3: s3,
  bucket: config.aws.S3_BUCKET,
  metadata: function (req, file, callback) {
    callback(null, { fieldName: file.fieldname })
  },
  key: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});

/* Saves locally */
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
