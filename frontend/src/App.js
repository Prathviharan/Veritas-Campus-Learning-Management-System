/* import React from 'react';
import { Route, Routes } from "react-router-dom";
import Button from './components/Button';
import Footer from './components/Footer';
import Home from "./pages/static/Home";
import Navbar from "./components/Navbar";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AssignmentSubmission from "./pages/student/AssignmentSubmission";
import MarksShowing from "./pages/student/MarksShowing";
import StudentPrivateFiles from "./pages/student/StudentPrivateFiles";
import StudentNotificationPage from './pages/student/StudentNotificationPage';
import InstructorNotificationForm from './pages/instructor/InstructorNotificationForm';




function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/assignment" element={<AssignmentSubmission />} />
        <Route path="/student/marks" element={<MarksShowing />}/>
        <Route path="/private-files" element={<StudentPrivateFiles />} />
        <Route path="/student/notifications" element={<StudentNotificationPage />} />
        <Route path="/instructor/notifications" element={<InstructorNotificationForm />} />
      </Routes>
      <Button/>
    
      <Footer />
    </div>
  );
}

export default App;  */

import React from 'react';
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Components
import Button from './components/Button';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";

// Static Pages
import Home from "./pages/static/Home";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";

// Student Pages
import AssignmentSubmission from "./pages/student/AssignmentSubmission";
import MarksShowing from "./pages/student/MarksShowing";
import StudentPrivateFiles from "./pages/student/StudentPrivateFiles";
import StudentNotificationPage from './pages/student/StudentNotificationPage';

// Instructor Pages
import InstructorNotificationForm from './pages/instructor/InstructorNotificationForm';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          {/* Static Routes */}
          <Route path="/" element={<Home />} />  
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/news" element={<News />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* Student Routes */}
          <Route path="/assignment" element={<AssignmentSubmission />} />
          <Route path="/student/marks" element={<MarksShowing />}/>
          <Route path="/private-files" element={<StudentPrivateFiles />} />
          <Route path="/student/notifications" element={<StudentNotificationPage />} />

          {/* Instructor Routes */}
          <Route path="/instructor/notifications" element={<InstructorNotificationForm />} />
        </Routes>
      </main>

      <Button />
      <Footer />
    </div>
  );
}

export default App;
