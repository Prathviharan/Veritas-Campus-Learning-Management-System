// src/pages/instructor/AddAssignment.js
import React, { useState } from 'react';
import '../../css/AddAssignment.css';
import axios from 'axios';
import Button from '../../components/Button';
import SuccessModal from '../../components/SuccessModal';
import { useNavigate } from 'react-router-dom';

const AddAssignment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    visibility: 'Public',
    deadline: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file', formData.file);
    data.append('visibility', formData.visibility);
    
    // Convert local time to UTC
    const localDate = new Date(formData.deadline);
    const utcDate = new Date(Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      localDate.getHours(),
      localDate.getMinutes()
    ));
    
    data.append('deadline', utcDate.toISOString());

    try {
      await axios.post('http://localhost:5000/api/instructor/assignments', data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  const handleViewAll = () => {
    setShowModal(false);
    setTimeout(() => {
      navigate('/instructor/added-assignment');
    }, 100);
  };

  return (
    <div className="add-assignment">
      <h2>Add New Assignments</h2>
      <form onSubmit={handleSubmit} className="assignment-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input type="file" name="file" onChange={handleChange} required />
        <div className="visibility">
          <label>
            <input type="radio" name="visibility" value="Public" checked={formData.visibility === 'Public'} onChange={handleChange} />
            Public
          </label>
          <label>
            <input type="radio" name="visibility" value="Private" onChange={handleChange} />
            Private
          </label>
        </div>
        <input 
          type="datetime-local" 
          name="deadline" 
          onChange={handleChange} 
          min={new Date().toISOString().slice(0, 16)}
          required 
        />
        <Button text="Save & Publish" onClick={handleSubmit} />
      </form>

      {showModal && (
        <SuccessModal
          message="Assignment uploaded successfully!"
          onClose={() => setShowModal(false)}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  );
};

export default AddAssignment;
