const Instructors = require("../../models/Instructors");
const User = require("../../models/Student/User");
const Course = require("../../models/courses.model");

exports.createInstructor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      contactNumber,
      coursesAssigned,
    } = req.body;

    const image = req.file ? req.file.path : null;

    // Step 1: Create User
    const user = new User({
      name,
      email,
      password,
      role: "instructor",
    });

    await user.save();
    console.log("User created:", user._id);

    // Step 2: Convert course names to ObjectIds
    const courseDocs = await Course.find({
      title: { $in: coursesAssigned },
    });

    if (courseDocs.length !== coursesAssigned.length) {
      return res.status(400).json({
        message: "One or more course titles are invalid or missing.",
      });
    }

    const courseIds = courseDocs.map((course) => course._id);

    // Step 3: Create Instructor
    const instructor = await Instructors.create({
      instructorID: user._id,
      name,
      email,
      department,
      contactNumber,
      coursesAssigned: courseIds,
      password,
    });

    res.status(201).json({
      message: "Instructor created successfully",
      userId: user._id,
      instructorId: instructor._id,
    });
  } catch (error) {
    console.error("Error creating instructor:", error);
    res.status(500).json({ message: error.message });
  }
};
