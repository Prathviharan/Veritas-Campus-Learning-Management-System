const express = require("express");
const router = express.Router();

const {
  getProgress,
  markLectureComplete,
  markTutorialeComplete,
  markQuizAttempt,
  markAssignmentComplete,
} = require("../controllers/student/progress.controller");

router.get("/progress/:courseId/:studentId", getProgress);
router.post("/progress/lecture", markLectureComplete);
router.post("/progress/tutorial", markTutorialeComplete);
router.post("/progress/quiz", markQuizAttempt);
router.post("/progress/assignment", markAssignmentComplete);

module.exports = router;
