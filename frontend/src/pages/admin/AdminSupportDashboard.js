// src/pages/admin/AdminSupportDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Row, Col, Card, Badge, 
  Button, Modal, Form, Alert, Spinner
} from 'react-bootstrap';
import './AdminSupportDashboard.css';

const AdminSupportDashboard = () => {
  const [supportRequests, setSupportRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'replied'
  const fetchSupportRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/student/support', {
        params: { isAdmin: true }
      });
      setSupportRequests(res.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch support requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportRequests();
  }, []);

  const handleReplyClick = (request) => {
    setSelectedRequest(request);
    setReplyMessage(request.adminReply?.message || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyMessage('');
    setError('');
  };
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!replyMessage.trim()) {
      setError('Reply message cannot be empty.');
      return;
    }
    
    if (!adminName.trim()) {
      setError('Admin name is required.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(
        `http://localhost:5000/api/student/support/${selectedRequest._id}/reply`,
        {
          message: replyMessage,
          adminName: adminName
        }
      );

      // Update the list with the updated request
      setSupportRequests(
        supportRequests.map(req => 
          req._id === selectedRequest._id ? response.data.data : req
        )
      );
      
      setSuccessMessage('Reply sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
      
      handleCloseModal();
    } catch (error) {
      setError('Failed to send reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };  const handleDelete = async (id) => {
    // Find the request to check its status
    const requestToDelete = supportRequests.find(req => req._id === id);
    
    // Only allow deletion if the request status is 'replied'
    if (!requestToDelete || requestToDelete.status !== 'replied') {
      setError("Only replied requests can be deleted.");
      return;
    }    
    if (window.confirm("Are you sure you want to delete this replied request?")) {
      try {
        console.log("Admin deleting request with ID:", id);
        
        // Use params object for consistent query parameter handling
        await axios.delete(`http://localhost:5000/api/student/support/${id}`, {
          params: { isAdmin: true }
        });
        
        setSuccessMessage("Support request deleted successfully!");
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchSupportRequests();
      } catch (error) {
        console.error("Admin delete error:", error);
        setError(error.response?.data?.message || "Failed to delete request.");
        // Clear error after 5 seconds
        setTimeout(() => setError(''), 5000);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const getStatusBadge = (status) => {
    return status === 'pending' 
      ? <Badge bg="warning" className="status-badge">Pending</Badge>
      : <Badge bg="success" className="status-badge">Replied</Badge>;
  };

  const filteredRequests = filter === 'all' 
    ? supportRequests 
    : supportRequests.filter(req => req.status === filter);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Support Dashboard</h2>
        <div className="filter-buttons">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline-primary'} 
            onClick={() => setFilter('all')}
            className="me-2"
          >
            All
          </Button>
          <Button 
            variant={filter === 'pending' ? 'warning' : 'outline-warning'} 
            onClick={() => setFilter('pending')}
            className="me-2"
          >
            Pending
          </Button>
          <Button 
            variant={filter === 'replied' ? 'success' : 'outline-success'} 
            onClick={() => setFilter('replied')}
          >
            Replied
          </Button>
        </div>
      </div>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <p className="lead">No support requests found.</p>
        </div>
      ) : (
        <Row>
          {filteredRequests.map((request) => (
            <Col key={request._id} md={6} lg={4} className="mb-4">
              <Card className="admin-support-card h-100 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">#{request._id.slice(-6)}</span>
                  {getStatusBadge(request.status)}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{request.studentName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{request.studentID}</Card.Subtitle>
                  
                  <div className="mt-3">
                    <p><strong>Issue:</strong></p>
                    <p className="issue-text">{request.issue}</p>
                  </div>
                  
                  {request.adminReply && request.adminReply.message && (
                    <div className="admin-reply mt-3 p-2 rounded">
                      <p className="mb-1"><strong>Admin Reply:</strong></p>
                      <p className="mb-1">{request.adminReply.message}</p>
                      <p className="text-muted mb-0">
                        <small>
                          By: {request.adminReply.adminName} | 
                          {request.adminReply.repliedAt && ` at ${formatDate(request.adminReply.repliedAt)}`}
                        </small>
                      </p>
                    </div>
                  )}                </Card.Body>
                <Card.Footer>
                  <div className="card-actions d-flex">
                    <Button 
                      className="submit-btn me-2 flex-grow-1"
                      onClick={() => handleReplyClick(request)}
                    >
                      {request.status === 'pending' ? 'Reply' : 'Edit Reply'}
                    </Button>
                    {request.status === 'replied' && (
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDelete(request._id)}
                        className="delete-btn"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Reply Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRequest?.status === 'pending' ? 'Reply to Request' : 'Edit Reply'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <div className="mb-3">
                <h5>Student: {selectedRequest.studentName}</h5>
                <p className="text-muted">Submitted: {formatDate(selectedRequest.createdAt)}</p>
                <p><strong>Issue:</strong> {selectedRequest.issue}</p>

                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmitReply}>
                  <Form.Group className="mb-3">
                    <Form.Label>Admin Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Your Reply</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      required
                      placeholder="Type your reply here..."
                    />
                  </Form.Group>
                  
                  <div className="d-flex justify-content-end">                    <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="submit-btn"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Sending...
                        </>
                      ) : (
                        'Send Reply'
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminSupportDashboard;
