
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentNotificationPage.css';

const StudentNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/notifications');
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="notifications-container">Loading notifications...</div>;
  }

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <div className="empty-state">No notifications available</div>
      ) : (
        <div className="notifications-grid">
          {notifications.map((notification) => (
            <div key={notification._id} className={`notification-card ${notification.isImportant ? 'important' : ''}`}>
              {notification.imageUrl && (
                <div className="notification-image">
                  <img 
                    src={`http://localhost:5000${notification.imageUrl}`} 
                    alt="Notification" 
                  />
                </div>
              )}
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <div className="notification-meta">
                  <span>{new Date(notification.createdAt).toLocaleString()}</span>
                  {notification.course && (
                    <span className="course-tag">{notification.course.name}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotificationPage;

