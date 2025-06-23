

/*
import React, { useState } from 'react';
import axios from 'axios';
import './InstructorNotificationForm.css';

const InstructorNotificationForm = ({ courses = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    course: '',
    isImportant: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/instructor/notifications', {
        title: formData.title,
        message: formData.message,
        course: formData.course,
        isImportant: formData.isImportant
      });

      if (response.data.success) {
        setSuccess('Notification sent successfully!');
        setFormData({
          title: '',
          message: '',
          course: '',
          isImportant: false
        });
      } else {
        setError(response.data.error || 'Failed to send notification');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.error || 'Server responded with error');
    }
  };

  return (
    <div className="notification-form-container">
      <h2>Create New Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Course (optional)</label>
          <select
            name="course"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isImportant"
            name="isImportant"
            checked={formData.isImportant}
            onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
          />
          <label htmlFor="isImportant">Mark as important</label>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="submit-btn">
          Send Notification
        </button>
      </form>
    </div>
  );
};

export default InstructorNotificationForm;    */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InstructorNotificationForm.css';

const InstructorNotificationForm = ({ courses = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    course: '',
    isImportant: false,
    image: null
  });
  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/instructor/notifications');
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('course', formData.course);
      formDataToSend.append('isImportant', formData.isImportant);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      let response;
      if (editingId) {
        response = await axios.put(
          `http://localhost:5000/api/instructor/notifications/${editingId}`,
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        response = await axios.post(
          'http://localhost:5000/api/instructor/notifications',
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      if (response.data.success) {
        setSuccess(editingId ? 'Notification updated successfully!' : 'Notification sent successfully!');
        resetForm();
        fetchNotifications();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server responded with error');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      course: '',
      isImportant: false,
      image: null
    });
    setEditingId(null);
  };

  const handleEdit = (notification) => {
    setFormData({
      title: notification.title,
      message: notification.message,
      course: notification.course?._id || '',
      isImportant: notification.isImportant,
      image: null
    });
    setEditingId(notification._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/instructor/notifications/${id}`);
        if (response.data.success) {
          setSuccess('Notification deleted successfully!');
          fetchNotifications();
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete notification');
      }
    }
  };

  return (
    <div className="notification-management">
      <div className="notification-form-container">
        <h2>{editingId ? 'Edit Notification' : 'Create New Notification'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Image (optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="form-group">
            <label>Course (optional)</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              checked={formData.isImportant}
              onChange={handleChange}
            />
            <label htmlFor="isImportant">Mark as important</label>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : (editingId ? 'Update Notification' : 'Send Notification')}
          </button>
          {editingId && (
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="notification-list">
        <h3>Your Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications created yet</p>
        ) : (
          <div className="notifications-grid">
            {notifications.map((notification) => (
              <div key={notification._id} className="notification-item">
                {notification.imageUrl && (
                  <div className="notification-image">
                    <img 
                      src={`http://localhost:5000${notification.imageUrl}`} 
                      alt="Notification" 
                    />
                  </div>
                )}
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <div className="notification-meta">
                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    {notification.course && (
                      <span className="course-tag">{notification.course.name}</span>
                    )}
                    {notification.isImportant && (
                      <span className="important-tag">Important</span>
                    )}
                  </div>
                </div>
                <div className="notification-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(notification)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(notification._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorNotificationForm;
