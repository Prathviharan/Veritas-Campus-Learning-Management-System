import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";


// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Footer from "./components/Footer";

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


import CreateAnnouncement from "./pages/admin/CreateAnnouncement";
import SendNotification from "./pages/admin/SendNotification";
import Settings from "./components/adminContactSettings.jsx";
import ViewAnnouncements from "./pages/admin/ViewAnnouncements";

import EditAnnouncement from "./components/EditeAnnouncemet";
import EditNotification from "./components/EditNotification";

import SingleViewSupport from "./pages/admin/SingleViewSupport";
import AdminReportPage from "./pages/admin/AdminReportPage";
import AdminSupport from "./pages/admin/AdminSupport";

import AddInstructor from './pages/admin/AddInstructor';
import ManageInstrutors from './pages/admin/ManageInstrutors';
import EditInsructor from './pages/admin/EditInsructor';
import QuizExam from './pages/admin/QuizExam';
import Quizes from './pages/admin/Quizes';
import Exams from './pages/admin/Exams';

// Student Pages
import SupportForm from "./pages/student/SupportForm";
import SupportList from "./pages/student/SupportList";
import ModulePage from "./pages/student/ModulePage";

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


import StudentLayout from "./layouts/StudentLayout";
import StudentProfile from "./pages/student/StudentProfile";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import EditProfile from "./pages/student/EditProfile";
import ChangePassword from "./pages/student/ChangePassword";
import Progress from "./pages/student/Progress";

import Questions from "./pages/student/quiz/Questions";
import ConfirmSubmissionPage from "./pages/student/quiz/ConfirmSubmissionPage";
import Dashboard from "./pages/student/Dashboard";
import ProgrammesList from "./pages/student/Program";
import Quiz from "./pages/student/quiz/Quiz";
import PublicLayout from "./layouts/PublicLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import AdminLayout from "./layouts/AdminLayout";
import { StudentModules } from "./pages/student/StudentModules";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/news" element={<News />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/supportdesk" element={<SupportDesk />} />
          <Route
            path="/successfully-request"
            element={<SuccessfullyRequest />}
          />
        </Route>

        {/*Admin Side Pages */}
        <Route path="/admin" element={<AdminLayout />}>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="adminSupport" element={<AdminSupport />} />
          <Route path="singleViewSupport/:id" element={<SingleViewSupport />} />
          <Route path="adminReportPage" element={<AdminReportPage />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="courses/add" element={<AddCourse />} />
          
          <Route path="addinstructor" element={<AddInstructor />} />
          <Route path="allinstrutors" element={<ManageInstrutors />} />
          <Route path="editinstructor/:id" element={<EditInsructor />} />
          <Route path="quizexam" element={<QuizExam />} />
          <Route path="quizes" element={<Quizes />} />
          <Route path="exams" element={<Exams />} />

          <Route path="create-announcement" element={<CreateAnnouncement />} />
          <Route path="send-notification" element={<SendNotification />} />
          <Route path="settings" element={<Settings />} />
          <Route path="announcements" element={<ViewAnnouncements />} />
          <Route path="edit-announcement/:id" element={<EditAnnouncement />} />
          <Route path="edit-notification/:id" element={<EditNotification />} />

        </Route>

        <Route path="/instructor" element={<InstructorLayout />}>
          <Route path="addannouncement" element={<AddAnnouncement />} />
          <Route path="addedannouncement" element={<AddedAnnouncement />} />
          <Route
            path="updateannouncement/:id"
            element={<UpdateAnnouncement />}
          />
          <Route path="addquiz" element={<AddQuiz />} />
          <Route path="quizlist" element={<QuizList />} />
          <Route path="updatequiz/:id" element={<UpdateQuiz />} />
          <Route path="performance/:id" element={<QuizPerformance />} />

          {/* Instructor - Assignment */}
          <Route path="addassignment" element={<AddAssignment />} />
          <Route path="added-assignment" element={<AddedAssignment />} />
          <Route path="edit-assignment/:id" element={<EditAssignment />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route path="support-request" element={<SupportForm />} />
          <Route path="support-list" element={<SupportList />} />
          <Route path="supportdesk" element={<SupportDesk />} />
          <Route
            path="successfully-request"
            element={<SuccessfullyRequest />}
          />
          <Route path="mycourses" element={<StudentModules />} />
          <Route path="studentProfile" element={<StudentProfile />} />
          <Route path="enrolledcourses" element={<EnrolledCourses />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="progress" element={<Progress />} />
          <Route path="modulepage" element={<ModulePage />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/questions" element={<Questions />} />
          <Route path="submitQuiz" element={<ConfirmSubmissionPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="programme" element={<ProgrammesList />} />
          <Route path="support-request" element={<SupportForm />} />
          <Route path="support-list" element={<SupportList />} />
          <Route path="modules" element={<ModulePage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
