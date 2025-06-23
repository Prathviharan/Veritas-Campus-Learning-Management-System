

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  isImportant: { type: Boolean, default: false },
  imageUrl: { type: String }, // Store the image path
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
