import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/EditCourse.css';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedCourse, setEditedCourse] = useState({
    title: '',
    instructor: [''],
    description: ''
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/adminCourseStates/details/${id}`);
        const course = res.data.course;
        setEditedCourse({
          title: course.title || '',
          description: course.description || '',
          instructor: Array.isArray(course.instructor) ? course.instructor : [course.instructor || ''],
        });
      } catch (error) {
        console.error('Error fetching course:', error);
        alert('Failed to load course data.');
        navigate('/admin/courses');
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleInstructorChange = (index, value) => {
    const newInstructors = [...editedCourse.instructor];
    newInstructors[index] = value;
    setEditedCourse(prev => ({ ...prev, instructor: newInstructors }));
  };

  const handleAddInstructor = () => {
    setEditedCourse(prev => ({ ...prev, instructor: [...prev.instructor, ''] }));
  };

  const handleRemoveInstructor = (index) => {
    const newInstructors = editedCourse.instructor.filter((_, i) => i !== index);
    setEditedCourse(prev => ({ ...prev, instructor: newInstructors.length ? newInstructors : [''] }));
  };

  const handleSave = async () => {
    // Validate instructors
    if (editedCourse.instructor.some(name => !name.trim())) {
      alert('Please fill all instructor names or remove empty fields.');
      return;
    }

    // Sanitize data before sending
    const sanitizedCourse = {
      title: editedCourse.title.trim(),
      description: editedCourse.description.trim(),
      instructor: editedCourse.instructor.map(name => name.trim()),
    };

    try {
      await axios.put(`http://localhost:5000/api/adminCourseStates/stats/${id}`, sanitizedCourse);
      alert('Course updated successfully!');
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error updating course:', error.response ? error.response.data : error.message);
      alert('Failed to update course.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  return (
    <div className="edit-course-page">
      <h2>Edit Course</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedCourse.title}
            onChange={handleChange}
          />
        </label>

        <label>
          Instructors:
          {editedCourse.instructor.map((inst, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <input
                type="text"
                value={inst}
                onChange={(e) => handleInstructorChange(index, e.target.value)}
                placeholder={`Instructor ${index + 1}`}
              />
              {editedCourse.instructor.length > 1 && (
                <button type="button" onClick={() => handleRemoveInstructor(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddInstructor}>Add Instructor</button>
        </label>

        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            value={editedCourse.description}
            onChange={handleChange}
          />
        </label>

        <div className="form-buttons">
          <button type="button" className="btn-save" onClick={handleSave}>Save</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
