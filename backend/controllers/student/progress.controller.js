const Course = require("../../models/courses.model");
const UserProgress = require("../../models/userProgress.model");

const calculateProgress = async (courseId, studentId) => {
  const course = await Course.findById(courseId);
  const progress = await UserProgress.findOne({ courseId, studentId });

  if (!course) {
    throw new Error("Course not found");
  }

  // Handle cases where progress document might not exist yet for a new student/course
  const completedLectures = progress ? progress.completedLectures.length : 0;
  const completedTutorials = progress ? progress.completedTutorials.length : 0;
  const attemptedQuizes = progress ? progress.attemptedQuizes.length : 0;
  const completedAssignments = progress ? progress.completedAssignments.length : 0;

  // FIXED: Added null/undefined checks for course.lectures, etc.
  const totalLectures = course.lectures ? course.lectures.length : 0;
  const totalTutorials = course.tutorials ? course.tutorials.length : 0;
  const totalQuizes = course.quizes ? course.quizes.length : 0;
  const totalAssignments = course.assignments ? course.assignments.length : 0;

  const totalItems =
    totalLectures + totalTutorials + totalQuizes + totalAssignments;

  const completedItems =
    completedAssignments +
    completedLectures +
    attemptedQuizes +
    completedTutorials;

  const percentage =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return percentage;
};

const getProgress = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const percentage = await calculateProgress(courseId, studentId);
    const progressDetail = await UserProgress.findOne({ courseId, studentId }); // FIXED: Fetch the full document

    return res.status(200).json({ percentage, progressDetail }); // FIXED: Return both
  } catch (err) {
    console.error("Error getting progress:", err);
    return res.status(500).json({ message: "Error getting progress!", error: err.message });
  }
};

const markLectureComplete = async (req, res) => {
  try {
    const { courseId, studentId, lectureId } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      { $addToSet: { completedLectures: lectureId } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error marking lecture as complete" });
  }
};

const markTutorialComplete = async (req, res) => { // FIXED: Renamed from markTutorialeComplete
  try {
    const { courseId, studentId, tutorialId } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      { $addToSet: { completedTutorials: tutorialId } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error marking tutorial as complete" });
  }
};

const markQuizAttempt = async (req, res) => {
  try {
    const { courseId, studentId, quizId } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      { $addToSet: { attemptedQuizes: quizId } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error marking quiz attempt" });
  }
};

const markAssignmentComplete = async (req, res) => {
  try {
    const { courseId, studentId, assignmentId } = req.body;

    const progress = await UserProgress.findOneAndUpdate(
      { courseId, studentId },
      { $addToSet: { completedAssignments: assignmentId } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ progress });
  } catch (err) {
    return res.status(500).json({ message: "Error marking assignment as complete" });
  }
};

module.exports = {
  getProgress,
  markLectureComplete,
  markTutorialComplete, // FIXED: Export the corrected name
  markQuizAttempt,
  markAssignmentComplete,
};