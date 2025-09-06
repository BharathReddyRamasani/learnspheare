const Progress = require('../models/Progress');
const Course = require('../models/Course'); // Assume model with modules: [{id, videoKey, pdfKey}]

exports.enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id; // From auth middleware
  let progress = await Progress.findOne({ user: userId, course: courseId });
  if (!progress) {
    progress = new Progress({ user: userId, course: courseId, enrolledAt: new Date() });
    await progress.save();
  }
  req.io.to(userId).emit('progress:updated', progress);
  res.json(progress);
};

exports.startModule = async (req, res) => {
  const { courseId, moduleId } = req.body;
  const userId = req.user.id;
  const progress = await Progress.findOne({ user: userId, course: courseId });
  if (progress) {
    progress.recentActivity.push({ moduleId, action: 'started', timestamp: new Date() });
    progress.points += 5; // Award points
    await progress.save();
    req.io.to(userId).emit('progress:updated', progress);
  }
  res.json(progress);
};

// Add getModuleContent as in previous response for S3 URLs
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ /* credentials */ });
exports.getModuleContent = async (req, res) => {
  // As in previous response
};