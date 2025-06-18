const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true, // Ensure studentId is provided
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true, // Ensure courseId is provided
    },
  },
  { timestamps: true }
);

enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // Prevent duplicate enrollments

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
