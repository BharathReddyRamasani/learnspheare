const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrolledAt: Date,
  completedAt: Date,
  points: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  recentActivity: [{ moduleId: String, action: String, timestamp: Date }],
  modulesCompleted: { type: Number, default: 0 },
});

module.exports = mongoose.model('Progress', progressSchema);