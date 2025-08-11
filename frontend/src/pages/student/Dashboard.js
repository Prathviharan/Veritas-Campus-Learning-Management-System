import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetNotifications } from "../../Services/notificationService";
import bbImage from "../../assets/bb.png";
import "./Dashboard.css";

const dashboardData = {
  recentlyAccessedPrograms: [
    {
      id: 1,
      title: "Diploma in Business Administration",
      description:
        "Learn core business concepts including management, marketing, and finance.",
      lastAccessed: "2 days ago",
      progress: 65,
    },
    {
      id: 2,
      title: "Diploma in Human Resource Management",
      description:
        "Master HR skills such as recruitment, training, and performance management.",
      lastAccessed: "1 day ago",
      progress: 40,
    },
    {
      id: 3,
      title: "Diploma in English",
      description:
        "Improve your English language skills for academic and professional use.",
      lastAccessed: "5 hours ago",
      progress: 85,
    },
    {
      id: 4,
      title: "Diploma in Sales & Marketing",
      description:
        "Develop strategies for customer engagement and successful selling.",
      lastAccessed: "3 days ago",
      progress: 50,
    },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: notificationsData, loading, error } = useGetNotifications();

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState("");
  const [courses, setCourses] = useState([]);
  const studentId = localStorage.getItem("studentId");

  const [privateFiles, setPrivateFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/files');
        setPrivateFiles(data.files || data);
      } catch (err) {
        console.error('Failed to load files:', err);
      }
    };
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadProgress(0);
      const { data } = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded * 100) / progress.total);
            setUploadProgress(percent);
          },
        }
      );

      if (data.success && data.file) {
        setPrivateFiles((prevFiles) => [data.file, ...prevFiles]);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        alert("File uploaded successfully!");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileDownload = (filename) => {
    window.open(`http://localhost:5000/uploads/${filename}`, "_blank");
  };

  const handleDeleteFile = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`);
      setPrivateFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
      alert('File deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete file.');
    }
  };

  const handlePrivateFilesClick = () => {
    navigate("/student/private-files");
  };

  const handleNotificationsClick = () => {
    navigate("/student/notifications");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/enrolled/${studentId}`
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching enrolled courses", err);
      }
    };
    if (studentId) {
      fetchCourses();
    }
  }, [studentId]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleDateClick = (date) => setDate(date);
  const handleAddEvent = () => {
    if (event.trim()) {
      const newEvent = {
        id: Date.now(),
        date: date.toDateString(),
        text: event,
        completed: false,
      };
      setEvents([...events, newEvent]);
      setEvent("");
    }
  };

  const handleDeleteEvent = (id) => setEvents(events.filter((event) => event.id !== id));
  const handleToggleComplete = (id) => {
    setEvents(events.map((event) =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const handleEnrolledCourses = () => {
    navigate("/student/enrolledcourses");
  };

  const handleRecentlyAccessedProgram = () => {
    navigate("/student/programme");
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="left-content">
          <div className="rectangle-2142">
            <div className="rectangle-content">
              <h2 className="section-title">Recently accessed programs</h2>
              <div className="program-grid">
                {dashboardData.recentlyAccessedPrograms.map((program) => (
                  <div
                    className="program-card"
                    key={`program-${program.id}`}
                    onClick={handleRecentlyAccessedProgram}
                  >
                    <h3 className="program-name">{program.title}</h3>
                    <p className="program-desc">{program.description}</p>
                    <div className="program-meta">
                      <span>Last accessed: {program.lastAccessed}</span>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                        <span>{program.progress}% complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rectangle-2143">
            <div className="rectangle-content">
              <h2 className="section-title">Enrolled Courses</h2>
              {courses.length > 0 ? (
                <div className="course-grid">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="course-card"
                      onClick={handleEnrolledCourses}
                    >
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-instructor">Instructor: {course.instructor}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No enrolled courses found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-section1">
            <h3>Timeline</h3>
            <p>Timeline events go here...</p>
          </div>

          <div className="sidebar-section1">
            <h3 onClick={handleNotificationsClick} style={{ cursor: 'pointer' }}>
              Notifications
            </h3>
            {loading && <p>Loading notifications...</p>}
            {error && <p>Error loading notifications</p>}
            <ul className="notification-list">
              {notificationsData?.data?.slice(0, 3).map((notification) => (
                <li key={notification.id} className="notification-item">
                  {notification.message}
                </li>
              ))}
            </ul>
            {notificationsData?.data?.length > 3 && (
                <div className="view-more-container">
                    <button onClick={handleNotificationsClick} className="view-more-btn">
                        View More
                    </button>
                </div>
            )}
          </div>

          <div className="sidebar-section2">
            <h3 onClick={handlePrivateFilesClick} style={{ cursor: 'pointer' }}>
              Private files
            </h3>
            <ul className="file-list">
              {privateFiles.length === 0 ? (
                <p>No files uploaded yet.</p>
              ) : (
                privateFiles.slice(0, 3).map((file) => (
                  <li key={file._id}>
                    <div className="file-info">
                      <span className="file-name">{file.originalname}</span>
                      <span className="file-meta">
                        {new Date(file.uploadDate).toLocaleDateString()} • {Math.round(file.size / 1024)} KB
                      </span>
                    </div>
                    <button
                      className="file-download"
                      onClick={() => handleFileDownload(file.filename)}
                    >
                      Download
                    </button>
                    <button
                      className="file-delete"
                      onClick={() => handleDeleteFile(file._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
            {privateFiles.length > 3 && (
                <div className="view-more-container">
                    <button onClick={handlePrivateFilesClick} className="view-more-btn">
                        View More
                    </button>
                </div>
            )}
            
            <h4>Upload a File</h4>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
            <button onClick={handleFileUpload} disabled={!selectedFile || uploadProgress > 0}>
              {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload File'}
            </button>
            {uploadProgress > 0 && (
              <div className="progress-container">
                <div className="progress-bar-small">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-section calendar">
            <h3>Calendar</h3>
            <Calendar onChange={handleDateClick} value={date} className="react-calendar" />
            <div className="upcoming-events">
              <h3>Upcoming Events</h3>
              <div className="event-input">
                <input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="Add new event"
                />
                <button onClick={handleAddEvent}>Add</button>
              </div>
              {events.length > 0 ? (
                <ul className="events-list">
                  {events.map((ev) => (
                    <li key={ev.id} className={ev.completed ? "completed" : ""}>
                      <input
                        type="checkbox"
                        checked={ev.completed}
                        onChange={() => handleToggleComplete(ev.id)}
                      />
                      <div className="event-details">
                        <span className="event-date">{ev.date}</span>
                        <span className="event-text">{ev.text}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="delete-event"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-events">No events scheduled</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;