

const express = require('express');
const router = express.Router();

// ✅ Make sure this path and export is correct
const { getStudentNotifications } = require('../../controllers/student/notificationController');

router.get('/', getStudentNotifications); // ✅ This must be a function

module.exports = router;

