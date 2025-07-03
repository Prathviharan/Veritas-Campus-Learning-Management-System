const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Student/authRoutes");
const supportRoutes = require("./routes/Student/supportRoute");
const adminSupportRoutes = require("./routes/adminsupportroutes");
const adminReportRoutes = require("./routes/adminReportRoute");
const courseStatsRoutes = require("./routes/adminCourseStats");
const adminDashboardRoutes = require("./routes/adminDashboard");
const quizRoutes = require("./routes/quizRoutes");

const quizAnswersRoute = require("./routes/Student/quizAnswersRoute");
const studentRoutes = require("./routes/student");
const instructorRoutes = require("./routes/instructorRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student/support", supportRoutes);
app.use("/api/adminsupport", adminSupportRoutes);
app.use("/api/adminReport", adminReportRoutes);
app.use("/api/adminCourseStats", courseStatsRoutes);
app.use("/api/adminDashboard", adminDashboardRoutes);

// Database Connection
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/quizzes", quizRoutes);
app.use("/api/quizAnswers", quizAnswersRoute);
app.use("/api", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student/support", supportRoutes);
