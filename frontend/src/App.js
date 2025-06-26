import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

import Sidebar from "./components/Sidebar";
import Button from "./components/Button";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Static Pages
import Home from "./pages/static/Home";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import SupportDesk from "./pages/static/SupportDesk";
import SuccessfullyRequest from "./pages/static/SuccessfullyRequest";

// Auth Pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Courses from "./pages/admin/CoursesPage";
import CourseDetails from "./pages/admin/CourseDetails";
import EditCourse from "./pages/admin/EditCourse";
import AddCourse from "./pages/admin/AddCourse";
import AdminSupportDashboard from "./pages/admin/AdminSupportDashboard";

// Student Pages
import SupportForm from "./pages/student/SupportForm";
import SupportList from "./pages/student/SupportList";
import ModulePage from "./pages/student/ModulePage";
import StudentDashboard from "./pages/student/Dashboard";

// Instructor Pages - Quiz
import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import UpdateQuiz from "./pages/instructor/UpdateQuiz";
import QuizPerformance from "./pages/instructor/QuizPerformance";

// Instructor Pages - Assignment
import AddAssignment from "./pages/instructor/AddAssignment";
import AddedAssignment from "./pages/instructor/AddedAssignment";
import EditAssignment from "./pages/instructor/EditAssignment";

// Instructor Pages - Announcements
import AddAnnouncement from "./components/AddAnnouncement";
import AddedAnnouncement from "./components/AddedAnnouncement";
import UpdateAnnouncement from "./components/UpdateAnnouncement";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import StudentRoutes from "./routes/StudentRoutes";
import StudentNavbar from "./components/StudentNavbar";

function App() {
  return (
    <div>
      {/* Global Navbar */}
      <StudentNavbar />
      {/* Instructor Navbar */}

      <ScrollToTop />

      <Routes>
        {/* Static Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/supportdesk" element={<SupportDesk />} />
        <Route path="/successfully-request" element={<SuccessfullyRequest />} />

        {/* Authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Pages */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/course/:id" element={<CourseDetails />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/support" element={<AdminSupportDashboard />} />

        {/* Student Pages */}
        <Route path="/support-request" element={<SupportForm />} />
        <Route path="/support-list" element={<SupportList />} />
        <Route path="/student/modules" element={<ModulePage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Instructor - Quiz */}
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/performance/:id" element={<QuizPerformance />} />

        {/* Instructor - Assignment */}
        <Route path="/addassignment" element={<AddAssignment />} />
        <Route
          path="/instructor/added-assignment"
          element={<AddedAssignment />}
        />
        <Route
          path="/instructor/edit-assignment/:id"
          element={<EditAssignment />}
        />

        {/* Instructor - Announcement */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route
          path="/updateannouncement/:id"
          element={<UpdateAnnouncement />}
        />
        {StudentRoutes()}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;