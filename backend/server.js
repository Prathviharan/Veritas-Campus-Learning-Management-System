const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Student/authRoutes");

const notificationRouter = require('./routes/notification.router');
const announcementRouter = require('./routes/announcement.router');
const studentSupportRoutes = require('./routes/student/supportRoute');

const supportRoutes = require("./routes/Student/supportRoute");

const quizRoutes = require("./routes/quizRoutes");

const quizAnswersRoute = require("./routes/Student/quizAnswersRoute");
const studentRoutes = require("./routes/student");
const instructorRoutes = require("./routes/instructorRoutes");


// Load env variables
dotenv.config();

// App
const app = express();

// Middleware
app.use(express.json());

app.use(cors());



app.use(express.urlencoded({ extended: true }));


// Routes

app.use('/api/auth', authRoutes);
// Routes
app.use('/api/student/support', studentSupportRoutes);
app.use("/api/notification", notificationRouter);
app.use("/api/announcement", announcementRouter);



// Database Connection
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // to serve uploaded images


=======
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // to serve uploaded images

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Not Connected", err));

// Routes


app.use("/api/quizzes", quizRoutes);
app.use("/api/quizAnswers", quizAnswersRoute);
app.use("/api", studentRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student/support", supportRoutes);
