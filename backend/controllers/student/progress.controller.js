const Course = require("../../models/courses.model");
const UserProgress = require("../../models/userProgress.model");

const calculateProgress = async (courseId, studentId) => {
  const course = await Course.findById(courseId);
  const progress = await UserProgress.findOne({ courseId, studentId });

  const totalLectures = course.lectures.length;
  const totalTutorials = course.tutorials.length;
  const totalQuizes = course.quizes.length;
  const totalAssignments = course.assignments.length;

  const completedLectures = progress.completedLectures.length;
  const completedTutorials = progress.completedTutorials.length;
  const attemptedQuizes = progress.attemptedQuizes.length;
  const completedAssignments = progress.completedAssignments.length;

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

    return res.status(200).json({ percentage });
  } catch (err) {
    return res.status(500).json({ message: "Error getting percentage!" });
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
    return res
      .status(500)
      .json({ message: "Error marking lecture as complete" });
  }
};

const markTutorialeComplete = async (req, res) => {
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
    return res
      .status(500)
      .json({ message: "Error marking assignment as complete" });
  }
};

module.exports = {
  getProgress,
  markAssignmentComplete,
  markLectureComplete,
  markQuizAttempt,
  markTutorialeComplete,
};
