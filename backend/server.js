
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/Student/authRoutes");


const studentSupportRoutes = require('./routes/student/supportRoute');


// Load env variables
dotenv.config();


// App
const app = express();

// Middleware

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/auth', authRoutes);

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

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // to serve uploaded images

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("MongoDB Not Connected", err));

// Routes
app.use('/api/student/support', studentSupportRoutes);


