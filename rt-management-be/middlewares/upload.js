const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/PNG',
      'image/JPG',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error(
        'Invalid file type. Only JPG, JPEG, and PNG are allowed.'
      );
      error.code = 'LIMIT_FILE_TYPES';
      return cb(error, false);
    }
    cb(null, true);
  },
});

module.exports = upload;
