/* import Student from "../../models/Student/student.model.js";
import User from "../../models/Student/User.js";

// GET /api/student/profile/:id
export const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json({
      success: true,
      studentProfile: student,
    });
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getStudentUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    const userId = student.userId;
    res.status(200).json({ userId: userId });
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user: user });
  } catch (err) {
    console.error("Failed to fetch user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
*/



const Student = require("../../models/Student/student.model.js");
const User = require("../../models/Student/User.js");

// GET /api/student/profile/:id
const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json({
      success: true,
      studentProfile: student,
    });
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getStudentUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    const userId = student.userId;
    res.status(200).json({ userId });
  } catch (err) {
    console.error("Failed to fetch student profile:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (err) {
    console.error("Failed to fetch user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getStudentProfile, getStudentUserId, getUser };
