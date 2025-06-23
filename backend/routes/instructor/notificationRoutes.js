

/*
const express = require('express');
const router = express.Router();
const {
  createNotification
} = require('../../controllers/instructor/notificationController');

router.post('/', createNotification);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/instructor/notificationController');
const multer = require('multer');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/notificationImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), notificationController.createNotification);
router.get('/', notificationController.getInstructorNotifications);
router.put('/:id', upload.single('image'), notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
