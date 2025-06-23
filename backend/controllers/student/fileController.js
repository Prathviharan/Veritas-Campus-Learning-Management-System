


const File = require('../../modules/File');
const fs = require('fs');
const path = require('path');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file selected for upload'
      });
    }

    // Verify file exists on disk
    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({
        success: false,
        message: 'File failed to save to server'
      });
    }

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date()
    });

    const savedFile = await newFile.save();

    // Return the complete file document
    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      file: savedFile // Return the full document
    });

  } catch (error) {
    // Clean up if file was saved but DB operation failed
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: error.message
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json({
      success: true,
      files: files.map(file => ({
        _id: file._id,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        uploadedAt: file.uploadedAt,
        url: `/uploads/${file.filename}`
      }))
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch files',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ 
        success: false,
        error: 'File not found' 
      });
    }

    // Delete from filesystem
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete from database
    await File.deleteOne({ _id: req.params.id });
    
    res.json({ 
      success: true,
      message: 'File deleted successfully',
      deletedFileId: req.params.id
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete file',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { uploadFile, getFiles, deleteFile };









