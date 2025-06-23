


const Notification = require('../../modules/Notification');
const fs = require('fs');
const path = require('path');

// Create notification with image upload
exports.createNotification = async (req, res) => {
  try {
    const { title, message, course, isImportant } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/notificationImages/${req.file.filename}`;
    }

    const notification = new Notification({
      title,
      message,
      course: course || null,
      isImportant: isImportant || false,
      imageUrl
    });

    const savedNotification = await notification.save();
    res.status(201).json({
      success: true,
      notification: savedNotification
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// Get all notifications for instructor
exports.getInstructorNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
};

// Update notification
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, message, course, isImportant } = req.body;
    let updateData = { title, message, course, isImportant, updatedAt: Date.now() };

    if (req.file) {
      updateData.imageUrl = `/uploads/notificationImages/${req.file.filename}`;
      // Delete old image if exists
      const oldNotification = await Notification.findById(id);
      if (oldNotification.imageUrl) {
        const oldImagePath = path.join(__dirname, '../../', oldNotification.imageUrl);
        fs.unlink(oldImagePath, (err) => { if (err) console.error('Error deleting old image:', err); });
      }
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json({ success: true, notification: updatedNotification });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update notification' });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    // Delete associated image if exists
    if (notification.imageUrl) {
      const imagePath = path.join(__dirname, '../../', notification.imageUrl);
      fs.unlink(imagePath, (err) => { if (err) console.error('Error deleting image:', err); });
    }

    res.json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete notification' });
  }
};
