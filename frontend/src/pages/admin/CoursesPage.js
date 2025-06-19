// src/pages/admin/CoursesPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/courses.css';
import Sidebar from '../../components/Sidebar';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses with stats from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adminCourseStates/stats');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  // Handle course delete with confirmation
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/adminCourseStates/stats/${id}`);
      alert("Course deleted successfully.");
      fetchCourses(); // Refresh list after delete
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete course.");
    }
  };

  // Load courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
  <div className="courses-layout">
    <Sidebar />
    <div className="courses-page">
      <h2 className="courses-title">Courses</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>No. of Instructor </th>
                <th>No. of Students</th>
                <th>No. of Modules</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No courses found.</td>
                </tr>
              ) : (
                courses.map(course => (
                  <tr key={course._id} className="course-row">
                    <td>
                      <Link to={`/admin/courses/${course._id}`} className="course-link">
                        {course.title}
                      </Link>
                    </td>
                    <td>{Array.isArray(course.instructor) ? course.instructor.length : 1}</td>
                    <td>{course.numStudents ?? 0}</td>
                    <td>{course.numModules ?? 0}</td>
                    <td>
                      <Link to={`/admin/courses/edit/${course._id}`} className="btn-edit" title="Edit Course">✏️</Link>
                      <button
                        onClick={() => handleDeleteClick(course._id)}
                        className="btn-delete"
                        title="Delete Course"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="button-container">
            <Link to="/admin/courses/add">
              <button className="btn-add-new">+ Add New Course</button>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
);

};

export default CoursesPage;
