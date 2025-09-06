const Progress = require('../models/Progress');

exports.getDashboardData = async (req, res) => {
  const userId = req.user.id;
  const progresses = await Progress.find({ user: userId });
  const data = {
    enrolledCourses: progresses.length,
    completedCourses: progresses.filter(p => p.progress === 100).length,
    points: progresses.reduce((sum, p) => sum + p.points, 0),
    recentActivity: progresses.flatMap(p => p.recentActivity.slice(-10)),
    continueLearning: progresses.filter(p => p.progress > 0 && p.progress < 100).map(p => ({ courseId: p.course, progress: p.progress })),
    progressGraph: progresses.map(p => ({ courseId: p.course, progress: p.progress, timeSpent: p.timeSpent })),
    timeSpent: progresses.reduce((sum, p) => sum + p.timeSpent, 0),
  };
  res.json(data);
};