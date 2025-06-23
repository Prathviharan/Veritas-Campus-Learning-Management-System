const express = require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const fileController = require('../../controllers/student/fileController');

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/', fileController.getFiles);
router.delete('/:id', fileController.deleteFile);

module.exports = router;