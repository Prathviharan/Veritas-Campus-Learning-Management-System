const Course = require('../../models/courses.model');
const UserProgress = require('../../models/userProgress.model');
const Lecture = require('../../models/Lecture'); 
const Tutorial = require('../../models/Tutorial'); 
const Quiz = require('../../models/Quiz');
const Assignment = require('../../models/assignmentmodel');
const { calculateProgress } = require('./progress.controller'); 

const getModuleContent = async (req, res) => {
  try {
    const { courseId, moduleId, studentId } = req.params;

    
    const course = await Course.findById(courseId)
      .populate({
        path: 'modules',
        match: { _id: moduleId }, 
        populate: [
          { path: 'lectures', model: 'Lecture' }, 
          { path: 'tutorials', model: 'Tutorial' }, 
          { path: 'quizes', model: 'Quiz' }, 
          { path: 'assignments', model: 'Assignment' }, 
        ]
      });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const module = course.modules[0]; 
    if (!module) {
      return res.status(404).json({ message: 'Module not found in this course' });
    }

    // Get student's progress for this specific course
    const userProgress = await UserProgress.findOne({ courseId, studentId });

    // Combine all module items and their completion status
    const allModuleItems = [];

    // Add lectures
    module.lectures.forEach(lecture => {
      allModuleItems.push({
        _id: lecture._id,
        title: lecture.title,
        type: 'lecture',
        completed: userProgress ? userProgress.completedLectures.map(String).includes(String(lecture._id)) : false,
        icon: 'bi bi-filetype-pdf', 
      });
    });

    // Add tutorials
    module.tutorials.forEach(tutorial => {
      allModuleItems.push({
        _id: tutorial._id,
        title: tutorial.title,
        type: 'tutorial',
        completed: userProgress ? userProgress.completedTutorials.map(String).includes(String(tutorial._id)) : false,
        icon: 'bi bi-filetype-pdf', 
      });
    });

    // Add quizzes
    module.quizes.forEach(quiz => {
      allModuleItems.push({
        _id: quiz._id,
        title: quiz.title,
        type: 'quiz',
        completed: userProgress ? userProgress.completedQuizes.map(String).includes(String(quiz._id)) : false,
        icon: 'bi bi-question-square',
      });
    });

    // Add assignments
    module.assignments.forEach(assignment => {
      allModuleItems.push({
        _id: assignment._id,
        title: assignment.title,
        type: 'assignment',
        completed: userProgress ? userProgress.completedAssignments.map(String).includes(String(assignment._id)) : false,
        icon: 'bi bi-journal-arrow-up',
      });
    });

    // Add recordings (assuming they are just URLs or strings in the module for now)
   
    (module.recordings || []).forEach((recordingUrl, index) => {
      allModuleItems.push({
        _id: `recording-${moduleId}-${index}`, 
        title: `Recording ${index + 1}`,
        type: 'recording',
        fileUrl: recordingUrl,
        completed: false, 
        icon: 'bi bi-file-earmark-play',
      });
    });

    // Calculate overall course progress using the exported function
    const overallProgressPercentage = await calculateProgress(courseId, studentId);

    return res.status(200).json({
      courseTitle: course.title,
      moduleTitle: module.title,
      moduleItems: allModuleItems.sort((a, b) => a.title.localeCompare(b.title)), 
      overallProgressPercentage: overallProgressPercentage,
    });

  } catch (err) {
    console.error("Error fetching module content:", err);
    return res.status(500).json({ message: "Error fetching module content!" });
  }
};

module.exports = {
  getModuleContent,
};