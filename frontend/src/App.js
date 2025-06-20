import React from "react";
import { Routes, Route } from "react-router-dom";
import './index.css';

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
import CreateAnnouncement from "./pages/admin/CreateAnnouncement";
import SendNotification from "./pages/admin/SendNotification";
import Settings from "./pages/admin/Settings";
import ViewAnnouncements from "./pages/admin/ViewAnnouncements";
import Layout from "./pages/admin/Layout";
import Layout_Announcement from "./pages/admin/Layout_Announcement";
import EditAnnouncement from "./components/EditeAnnouncemet";
import EditNotification from "./components/EditNotification"


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

function App() {
  return (
    <div>
      {/* Global Navbar */}
      <Navbar />
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


        <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<Layout_Announcement />}>
        <Route path="create-announcement" element={<CreateAnnouncement />} />
        <Route path="send-notification" element={<SendNotification />} />
        <Route path="settings" element={<Settings />} />
        <Route path="announcements" element={<ViewAnnouncements />} />
        </Route>
        <Route path="" element={<Layout_Announcement />}>
        <Route path="/edit-announcement/:id" element={<EditAnnouncement />} />
        <Route path="/edit-notification/:id" element={<EditNotification />} />
        </Route>

        

        <Route path="/support-request" element={<SupportForm />} />
        <Route path="/support-list" element={<SupportList />} />
        <Route path="/admin/support" element={<AdminSupportDashboard />} />
        <Route path="/supportdesk" element={<SupportDesk />} />
        <Route path="/successfully-request" element={<SuccessfullyRequest />} />

        {/* Instructor - Announcement */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route
          path="/updateannouncement/:id"
          element={<UpdateAnnouncement />}
        />

      </Routes>

      <Footer />
    </div>
  );
}

export default App;
