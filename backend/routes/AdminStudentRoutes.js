const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");

const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/admin/getAllStudent");

router.get("/all", getAllStudents); // Get all students
router.get("/:id", getStudentById); // Get student by ID
router.put("/edit/:id", upload.single("image"), updateStudent); // Update student
router.delete("/:id", deleteStudent);

module.exports = router;
