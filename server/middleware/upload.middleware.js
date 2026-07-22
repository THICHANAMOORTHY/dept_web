const multer = require('multer');
const path = require('path');

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'application/pdf';

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images and PDFs only!'));
  }
}

// Use memory storage — files will be uploaded to Supabase Storage, not disk
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = upload;
