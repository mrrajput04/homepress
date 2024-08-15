const multer = require('multer');

//middleware for uploading video
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  }),
}).single('video');

function uploadVideo(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({error: err.message});
    }
    next();
  });
}

module.exports = uploadVideo;