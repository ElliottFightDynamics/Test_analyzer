const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Codebase } = require('../models/Codebase');
const { parseCode } = require('../utils/codeParser');
const { UPLOAD_SUCCESS } = require('../utils/messageConstants');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadCodebase = [
  upload.single('codebase'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }

      const filePath = req.file.path;
      const codebaseData = await parseCode(filePath);

      // Save codebase information to the database
      const codebase = new Codebase({
        filename: req.file.filename,
        path: filePath,
        analysis: codebaseData
      });

      await codebase.save();

      // Send success response
      res.status(200).json({
        message: UPLOAD_SUCCESS,
        codebaseId: codebase._id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

module.exports = {
  uploadCodebase
};