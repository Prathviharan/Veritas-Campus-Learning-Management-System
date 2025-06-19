import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/supportCSS.css';
import Sidebar from '../../components/Sidebar';

const SingleViewSupport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [reply, setReply] = useState("");

  const handleReplySubmit = () => {
    if (!reply.trim()) {
      alert("Reply cannot be empty!");
      return;
    }

    axios.put(`http://localhost:5000/api/adminsupport/reply/${id}`, { reply })
      .then(res => {
        alert("Reply sent!");
        setReply("");
        setRequest(res.data); // update with new data
      })
      .catch(err => {
        console.error("Error sending reply:", err.response?.data || err.message);
        alert("Failed to send reply.");
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/adminsupport/getRequestById/${id}`)
      .then(res => setRequest(res.data))
      .catch(err => {
        console.error('Error fetching request:', err);
        alert('Request not found');
        navigate('/adminsupport');
      });
  }, [id, navigate]);

  if (!request) return <div>Loading...</div>;

  // Destructure with fallbacks
  const {
    studentID,
    studentName,
    lectureName,
    email,
    contactNumber,
    requestType,
    subject,
    status,
    message,
    issue,
    photo,
  } = request;

  const requesterName = studentName || lectureName || 'N/A';

  return (
    <div className='admin-support-container'>
      <Sidebar />
      <div className='view-container'>
        <h2 className='title'>
          {studentID ? 'Student' : 'Instructor'} Support Request Details
        </h2>

        <div className='view-box'>
          {studentID && <p><strong>Student ID:</strong> {studentID}</p>}
          <p><strong>Name:</strong> {requesterName}</p>
          {email && <p><strong>Email:</strong> {email}</p>}
          {contactNumber && <p><strong>Contact:</strong> {contactNumber}</p>}
          {requestType && <p><strong>Request Type:</strong> {requestType}</p>}
          {subject && <p><strong>Subject:</strong> {subject}</p>}
          <p><strong>Status:</strong> {status || 'Pending'}</p>
          <p><strong>Message / Issue:</strong> {message || issue || 'N/A'}</p>

          {photo && (
            <div>
              <strong>Attachment:</strong><br />
              <a href={photo} target="_blank" rel="noopener noreferrer">
                <img src={photo} alt="attachment" className="attachment-image" />
              </a>
            </div>
          )}

          <div className="reply-section">
            <h3>Reply to Request</h3>
            <textarea
              className="reply-textarea"
              rows="4"
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="button-container">
              <button className='b-btn' onClick={() => navigate(-1)}>Back</button>
              <button className="s-btn" onClick={handleReplySubmit}>Send Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleViewSupport;
