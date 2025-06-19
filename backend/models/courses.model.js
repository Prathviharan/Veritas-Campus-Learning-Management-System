const mongoose = require('mongoose');


// Assuming lectures and tutorials might have separate models referenced by ID
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // You can add more course-level details here, e.g., instructor, prerequisites, etc.
  modules: [{ // Each course can have multiple modules
    title: {
      type: String,
      required: true,
      trim: true,
    },
    lectures: [{ // Array of Lecture IDs (referencing a hypothetical Lecture model)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    }],
    tutorials: [{ // Array of Tutorial IDs (referencing a hypothetical Tutorial model)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial',
    }],
    quizes: [{ // Array of Quiz IDs (referencing your existing Quiz model)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    }],
    assignments: [{ // Array of Assignment IDs (referencing your existing Assignment model)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
    }],
    recordings: [{ // Assuming recordings are simply URLs for now, or you could create a Recording model
      type: String,
    }],
    // You can add other module-specific details here
  }],
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;