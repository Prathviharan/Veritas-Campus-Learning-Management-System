/*const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentAssignmentRoutes = require('./routes/student/assignmentRoutes');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to DB
connectDB();

// Routes
app.use('/api/student', studentAssignmentRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));         */

/*const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const path = require("path");
const cors = require('cors'); // not sure

dotenv.config();
connectDB();

app.use(cors()); // not sure
const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const studentRoutes = require("./routes/student/assignmentRoutes");
app.use("/api/student/assignments", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  */


/* const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const marksRoutes = require('./routes/student/marksRoutes');
const fileRoutes = require('./routes/student/fileRoutes'); // ✅ Private file upload routes

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (used for both assignments and private files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Mount routes
app.use('/api/assignments', assignmentRoutes);   // Assignments
app.use('/api/student', marksRoutes);            // Student marks
app.use('/api/files', fileRoutes);             // Private file upload


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); */



/* const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const marksRoutes = require('./routes/student/marksRoutes');
const fileRoutes = require('./routes/student/fileRoutes');

const instructorNotificationRoutes = require('./routes/instructor/notificationRoutes');
const studentNotificationRoutes = require('./routes/student/notificationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/student/marks', marksRoutes);
app.use('/api/student/files', fileRoutes);
app.use('/api/instructor', instructorNotificationRoutes);
app.use('/api/student', studentNotificationRoutes);
app.use('/api', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  
*/
/*
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (using your exact URL)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Create uploads directory if not exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(uploadDir));


// Routes
const fileRoutes = require('./routes/student/fileRoutes');
app.use('/api/files', fileRoutes);

const assignmentRoutes = require('./routes/student/assignmentRoutes');
app.use('/api/assignments', assignmentRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
});
*/

/*
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Create uploads directory if not exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use('/uploads', express.static(uploadDir));

// Routes
const fileRoutes = require('./routes/student/fileRoutes');
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const instructorNotificationRoutes = require('./routes/instructor/notificationRoutes');
const studentNotificationRoutes = require('./routes/student/notificationRoutes');

app.use('/api/files', fileRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/instructor/notifications', instructorNotificationRoutes);
app.use('/api/student/notifications', studentNotificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${uploadDir}`);
});
*/



const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection (updated without deprecated options)
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure file upload directories
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

// Main uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
createDirectory(uploadsDir);

// Notification images subdirectory
const notificationImagesDir = path.join(__dirname, 'uploads', 'notificationImages');
createDirectory(notificationImagesDir);

// Configure multer storage for notification images
const notificationImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, notificationImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images only (jpeg, jpg, png, gif)!');
  }
};

// Multer upload instance for notification images
const uploadNotificationImage = multer({
  storage: notificationImageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Make the upload middleware available to routes
app.locals.uploadNotificationImage = uploadNotificationImage;

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Routes
const fileRoutes = require('./routes/student/fileRoutes');
const assignmentRoutes = require('./routes/student/assignmentRoutes');
const instructorNotificationRoutes = require('./routes/instructor/notificationRoutes');
const studentNotificationRoutes = require('./routes/student/notificationRoutes');

app.use('/api/files', fileRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/instructor/notifications', instructorNotificationRoutes);
app.use('/api/student/notifications', studentNotificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    uploadsDirectory: uploadsDir,
    notificationImagesDirectory: notificationImagesDir
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle multer errors specifically
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    }
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads directory: ${uploadsDir}`);
  console.log(`Notification images directory: ${notificationImagesDir}`);
});