import React, { useState } from 'react';
import '../css/SidebarAdmin.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt,
  faChartLine,
  faBook,
  faChalkboardTeacher,
  faUsers,
  faUserPlus,
  faUserGraduate,
  faCertificate,
  faBullhorn,
  faBell,
  faListAlt,
  faLifeRing,
  faCog,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const SidebarAdmin = () => {
  const [openInstructor, setOpenInstructor] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  return (
    <div className="sidebar-admin" >
      <h1 className="sidebar-title">
        
          <span>Admin Dashboard</span>
        
      </h1>

      <div className="sidebar-section">
        <div className="sidebar-item">
         
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          > <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
            <span >Dashboard</span>
          </NavLink>
        </div>

        <div className="sidebar-item">
          
          <NavLink
            to="/admin/adminReportPage"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          ><FontAwesomeIcon icon={faChartLine} className="icon" />
            <span>Reports</span>
          </NavLink>
        </div>

        <div className="sidebar-item">
          
          <NavLink
            to="/admin/courses"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          ><FontAwesomeIcon icon={faBook} className="icon" />
            <span>Courses</span>
          </NavLink>
        </div>

        {/* Instructor manage toggle */}
        <div
          className="sidebar-item clickable"
          onClick={() => setOpenInstructor(!openInstructor)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
            <span >Instructor manage</span>
          </div>
          <FontAwesomeIcon icon={openInstructor ? faChevronUp : faChevronDown} />
        </div>
        {openInstructor && (
          <div className="sub-items">
            <div className="sidebar-item">
              
              <NavLink
                to="addinstructor"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              ><FontAwesomeIcon icon={faUserPlus} className="icon" />
                <span>Add Instructor</span>
              </NavLink>
            </div>
            <div className="sidebar-item">
             
              <NavLink
                to="allinstructors"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              > <FontAwesomeIcon icon={faChalkboardTeacher} className="icon" />
                <span>View all Instructors</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Student manage toggle */}
        <div
          className="sidebar-item clickable"
          onClick={() => setOpenStudent(!openStudent)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <span >Student manage</span>
          </div>
          <FontAwesomeIcon icon={openStudent ? faChevronUp : faChevronDown} />
        </div>
        {openStudent && (
          <div className="sub-items">
            <div className="sidebar-item">
             
              <NavLink
                to="/admin/add-student"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              > <FontAwesomeIcon icon={faUserPlus} className="icon" />
                <span>Add Student</span>
              </NavLink>
            </div>
            <div className="sidebar-item">
              
              <NavLink
                to="/admin/view-student"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              ><FontAwesomeIcon icon={faUserGraduate} className="icon" />
                <span>View all Students</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Announcements toggle */}
        <div
          className="sidebar-item clickable"
          onClick={() => setOpenAnnouncement(!openAnnouncement)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <FontAwesomeIcon icon={faBullhorn} className="icon" />
            <span>Announcements</span>
          </div>
          <FontAwesomeIcon icon={openAnnouncement ? faChevronUp : faChevronDown} />
        </div>
        {openAnnouncement && (
          <div className="sub-items">
            <div className="sidebar-item">
              
              <NavLink
                to="/admin/create-announcement"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              ><FontAwesomeIcon icon={faBullhorn} className="icon" />
                <span>Create Announcements</span>
              </NavLink>
            </div>
            <div className="sidebar-item">
              
              <NavLink
                to="/admin/send-notification"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              ><FontAwesomeIcon icon={faBell} className="icon" />
                <span>Send Notifications</span>
              </NavLink>
            </div>
            <div className="sidebar-item">
             
              <NavLink
                to="/admin/announcements"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              > <FontAwesomeIcon icon={faListAlt} className="icon" />
                <span>View all Announcements</span>
              </NavLink>
            </div>
          </div>
        )}

        <div className="sidebar-item">
          
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          ><FontAwesomeIcon icon={faCertificate} className="icon" />
            <span>Exams & certification</span>
          </NavLink>
        </div>

        <div className="sidebar-item">
          
          <NavLink
            to="/admin/adminSupport"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          ><FontAwesomeIcon icon={faLifeRing} className="icon" />
            <span>Support</span>
          </NavLink>
        </div>

        <div className="sidebar-item">
          
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
          ><FontAwesomeIcon icon={faCog} className="icon" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;