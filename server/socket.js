const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
  const io = socketio(server, { cors: { origin: '*' } });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
        if (err) return next(new Error('Auth error'));
        socket.user = decoded;
        next();
      });
    } else {
      next(new Error('Auth error'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(socket.user.id);

    socket.on('module:timeUpdate', async ({ courseId, moduleId, timeIncrement }) => {
      // Update Progress (require models/Progress.js)
      const Progress = require('./models/Progress');
      const progress = await Progress.findOne({ user: socket.user.id, course: courseId });
      if (progress) {
        progress.timeSpent += timeIncrement;
        progress.progress = (progress.modulesCompleted / 10) * 100; // Assume 10 modules/course
        await progress.save();
        io.to(socket.user.id).emit('progress:updated', progress);
      }
    });
  });

  return io;
};