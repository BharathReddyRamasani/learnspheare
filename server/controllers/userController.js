import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, interests: user.interests, skillLevel: user.skillLevel });
  } else { res.status(404).json({ message: 'User not found' }); }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.interests = req.body.interests || user.interests;
    user.skillLevel = req.body.skillLevel || user.skillLevel;
    if (req.body.password) { user.password = req.body.password; }
    const updatedUser = await user.save();
    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, interests: updatedUser.interests, skillLevel: updatedUser.skillLevel });
  } else { res.status(404).json({ message: 'User not found' }); }
};