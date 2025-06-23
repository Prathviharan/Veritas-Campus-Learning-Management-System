


import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './StudentPrivateFiles.css';

const StudentPrivateFiles = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();
  const dropAreaRef = useRef();

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/files');
      setFiles(data.files || data);
      setError('');
    } catch (err) {
      setError('Failed to load files. Please try again.');
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setUploadProgress(0);
      setError('');
      setSuccess('');

      const { data } = await axios.post(
        'http://localhost:5000/api/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded * 100) / progress.total);
            setUploadProgress(percent);
          },
        }
      );

      if (data.success && data.file) {
        setFiles((prevFiles) => [data.file, ...prevFiles]);
        setSuccess('File uploaded successfully!');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'File upload failed';
      setError(errorMsg);
      console.error('Upload error:', err);
    } finally {
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
    } catch (err) {
      setError('Failed to delete file');
      console.error('Delete error:', err);
      fetchFiles();
    }
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
      setError('');
      setSuccess('');
    }
  }, []);

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (dropArea) {
      dropArea.addEventListener('dragenter', handleDragEnter);
      dropArea.addEventListener('dragleave', handleDragLeave);
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('drop', handleDrop);

      return () => {
        dropArea.removeEventListener('dragenter', handleDragEnter);
        dropArea.removeEventListener('dragleave', handleDragLeave);
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('drop', handleDrop);
      };
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return (
    <div className="spf-container">
      <h2 className="spf-header">Private Files</h2>

      <div ref={dropAreaRef} className={`spf-upload-section ${isDragging ? 'drag-active' : ''}`}>
        <div className="spf-drag-message">
          {isDragging ? (
            <div className="spf-drag-hint">Drop your file here</div>
          ) : (
            <div className="spf-drag-hint">Drag & drop files here, or</div>
          )}
        </div>

        <div className="spf-file-input-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="*"
            className="spf-file-input"
            id="spf-file-upload"
          />
          <label htmlFor="spf-file-upload" className="spf-browse-btn">
            Browse Files
          </label>
          {selectedFile && (
            <div className="spf-selected-file">
              Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </div>
          )}
          <button
            className="spf-upload-btn"
            onClick={handleUpload}
            disabled={!selectedFile || uploadProgress > 0}
          >
            {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Upload'}
          </button>
        </div>

        {uploadProgress > 0 && (
          <div className="spf-progress-indicator">
            <div className="spf-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}

        {error && <div className="spf-error">{error}</div>}
        {success && <div className="spf-success">{success}</div>}
      </div>

      <div className="spf-files-list">
        <h3 className="spf-files-title">Your Files</h3>
        {files.length === 0 ? (
          <div className="spf-empty">No files uploaded yet</div>
        ) : (
          <ul className="spf-files-items">
            {files.map((file) => (
              <li key={file._id} className="spf-file-item">
                <a
                  href={`http://localhost:5000/uploads/${file.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spf-file-link"
                >
                  {file.originalname}
                </a>
                <span className="spf-file-size">({Math.round(file.size / 1024)} KB)</span>
                <button className="spf-delete-btn" onClick={() => handleDelete(file._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentPrivateFiles;








