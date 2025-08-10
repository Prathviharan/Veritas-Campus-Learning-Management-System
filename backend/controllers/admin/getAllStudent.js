
const Student = require("../../models/Student/student.model");
const Course= require("../../models/courses.model");
const User = require("../../models/Student/User");

// 📌 Get All Students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("course", "title");
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 📌 Get Student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("course", "title");
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.json(student);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 📌 Update Student
const updateStudent = async (req, res) => {
  try {
    const { name, email, age, address, gender, mobile, course } = req.body;

    const updateData = {
      name,
      email,
      age,
      address,
      gender,
      mobile,
      course,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
