import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";

const ModulePage = () => {
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();

  
  const studentId = "68187117c8e50295c68bba3e"; 

  const [courseTitle, setCourseTitle] = useState("Loading Course...");
  const [moduleTitle, setModuleTitle] = useState("Loading Module...");
  const [moduleItems, setModuleItems] = useState([]); // Will store all lectures, tutorials, quizzes etc.
  const [overallProgress, setOverallProgress] = useState(0);
  const [studentProgress, setStudentProgress] = useState(null); // NEW STATE for detailed progress
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModuleData = async () => {
    try {
      setLoading(true);
      setError(null);

      const courseResponse = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`
      );
      const course = courseResponse.data;

      if (course) {
        setCourseTitle(course.title);
        const currentModule = course.modules.find(
          (m) => m._id === moduleId
        );
        if (currentModule) {
          setModuleTitle(currentModule.title);

          const lectureDetailsPromises = (currentModule.lectures || [])
            .filter(Boolean) // ADDED .filter(Boolean) here
            .map(async (lectureId) => {
              const res = await axios.get(`http://localhost:5000/api/lectures/${lectureId}`);
              return { ...res.data, type: 'lecture' };
            });
          const tutorialDetailsPromises = (currentModule.tutorials || [])
            .filter(Boolean) // ADDED .filter(Boolean) here
            .map(async (tutorialId) => {
              const res = await axios.get(`http://localhost:5000/api/tutorials/${tutorialId}`);
              return { ...res.data, type: 'tutorial' };
            });
          const quizDetailsPromises = (currentModule.quizes || [])
            .filter(Boolean) // ADDED .filter(Boolean) here
            .map(async (quizId) => {
              const res = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
              return { ...res.data, type: 'quiz' };
            });
          const assignmentDetailsPromises = (currentModule.assignments || [])
            .filter(Boolean) // ADDED .filter(Boolean) here
            .map(async (assignmentId) => {
              const res = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}`);
              return { ...res.data, type: 'assignment' };
            });

          const allModuleItems = await Promise.all([
            ...lectureDetailsPromises,
            ...tutorialDetailsPromises,
            ...quizDetailsPromises,
            ...assignmentDetailsPromises
          ]);
          setModuleItems(allModuleItems);

        } else {
          setError("Module not found for this course.");
        }
      } else {
        setError("Course not found.");
      }

      // Fetch overall progress and detailed progress
      const progressResponse = await axios.get(
        `http://localhost:5000/api/progress/${courseId}/${studentId}`
      );
      setOverallProgress(progressResponse.data.percentage);
      setStudentProgress(progressResponse.data.progressDetail); // Store the full progress object

    } catch (err) {
      console.error("Error fetching module data:", err);
      setError(`Failed to load module data. Please check server status, IDs, and database content. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, [courseId, moduleId, studentId]);

  if (loading) {
    return <div className="container mt-5">Loading module...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-danger">{error}</div>;
  }

  // Function to check if an item is completed based on studentProgress
  // Function to check if an item is completed based on studentProgress
  const isItemCompleted = (item) => {
    if (!studentProgress || !studentProgress._id) return false;

    // Convert the item._id (from the fetched lecture/tutorial/etc. object) to a string
    const itemIdString = item._id.toString();

    switch (item.type) {
      case 'lecture':
        // Check if any of the IDs in completedLectures (converted to string) match itemIdString
        return studentProgress.completedLectures?.some(id => id.toString() === itemIdString);
      case 'tutorial':
        return studentProgress.completedTutorials?.some(id => id.toString() === itemIdString);
      case 'quiz':
        return studentProgress.attemptedQuizes?.some(id => id.toString() === itemIdString);
      case 'assignment':
        return studentProgress.completedAssignments?.some(id => id.toString() === itemIdString);
      default:
        return false;
    }
  };


  return (
    <div className="container">
      <div className="container d-flex justify-content-left">
        <h2 className="fw-bold fs-2" style={{ color: "#55B649" }}>
          {courseTitle}
        </h2>
      </div>
      <div className="container d-flex justify-content-left mt-4">
        <h2 className="fw-bold fs-4">{moduleTitle}</h2>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            {/* Display Module Items */}
            {moduleItems.length > 0 ? (
              moduleItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between align-items-center ms-5 me-5 mt-3">
                  <div className="d-flex">
                    <i className={`bi ${item.type === 'lecture' ? 'bi-filetype-pdf' : item.type === 'tutorial' ? 'bi-book' : item.type === 'quiz' ? 'bi-patch-question' : 'bi-journal-text'} me-3`}></i>
                    <p>{item.type}: {item.title}</p>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id={`flexCheckDefault-${item._id}`}
                      checked={isItemCompleted(item)}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor={`flexCheckDefault-${item._id}`}></label>
                  </div>
                </div>
              ))
            ) : (
              <p className="ms-5 me-5 mt-3">No content found for this module.</p>
            )}


            {/* Overall Progress */}
            <div className="progress-container ms-5 me-5 mt-3">
              <div className="d-flex justify-content-between">
                <p className="fw-bold">Overall progress</p>
                <p className="fw-bold">{overallProgress}%</p>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Example 1px high"
                aria-valuenow={overallProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: "5px" }}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${overallProgress}%`, backgroundColor: "#55B649" }}
                ></div>
              </div>
            </div>

            {/* Remaining UI elements */}
            <p className="ms-5 me-5 mt-3 fw-bold fs-6">
              Discussion Forum
            </p>
            <div className="d-flex justify-content-between align-items-center ms-5 me-5 mt-3">
              <div className="d-flex">
                <i className="bi bi-chat-dots me-3"></i>
                <p>Forum</p>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#55B649",
                    border: "1px solid #3E9355",
                  }}
                >
                  View
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar d-flex justify-content-center mt-3 mb-3">
              <Calendar />
            </div>

            <p className="ms-5 me-5 mt-3 fw-bold fs-6">
              Need any assistance?
            </p>
            <p className="ms-5 me-5 text-center">
              Access comprehensive support resources including technical
              assistance, FAQs, and contact options for quick problem
              resolution.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success fw-bold"
                type="submit"
                style={{
                  width: "150px",
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#95C436",
                  color: "white",
                  border: "1px solid #3E9355",
                  borderRadius: "6px",
                }}
              >
                Click here
              </button>
            </div>
            <p className="fw-bold fs-6 text-center mt-5">View marks</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success fw-bold mb-5"
                type="submit"
                style={{
                  width: "150px",
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#95C436",
                  color: "white",
                  border: "1px solid #3E9355",
                  borderRadius: "6px",
                }}
              >
                Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;