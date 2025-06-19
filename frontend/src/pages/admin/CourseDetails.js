import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/course.css'; // Make sure this path matches your structure

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/adminCourseStates/details/${id}`);
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        alert('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!courseData) return <p>No data found.</p>;

  const { course, materials, assignments, quizzes, exams } = courseData;

  return (
    <div className="course-details-container">
      <h2>{course.title}</h2>

      <div className="course-details-layout">
        {/* Row 1: Lecture Materials & Exams */}
        <div className="coursed-row">
          <div className="coursed-column">
            <h5>Lecture Materials</h5>
            {materials.length ? (
              <ul>
                {materials.map((m) => (
                  <li key={m._id}>{m.title}</li>
                ))}
              </ul>
            ) : <p>No materials available.</p>}
          </div>

          <div className="coursed-column">
            <h5>Exams</h5>
            {exams.length ? (
              <ul>
                {exams.map((e) => (
                  <li key={e._id}>{e.title}</li>
                ))}
              </ul>
            ) : <p>No exams available.</p>}
          </div>
        </div>

        {/* Row 2: Assignments & Quizzes */}
        <div className="coursed-row">
          <div className="coursed-column">
            <h5>Assignments</h5>
            {assignments.length ? (
              <ul>
                {assignments.map((a) => (
                  <li key={a._id}>{a.title}</li>
                ))}
              </ul>
            ) : <p>No assignments available.</p>}
          </div>

          <div className="coursed-column">
            <h5>Quizzes</h5>
            {quizzes.length ? (
              <ul>
                {quizzes.map((q) => (
                  <li key={q._id}>{q.title}</li>
                ))}
              </ul>
            ) : <p>No quizzes available.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
