import User from '../models/User.js';
import KnowledgeGraph from '../models/KnowledgeGraph.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { name, email, password, interests } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  
  const user = await User.create({ name, email, password, initialInterests: interests });
  
  if (user) {
    // CRITICAL STEP: Create the initial Knowledge Graph for the new user.
    // Populate it with their stated interests to kickstart personalization.
    const initialNodes = interests.map(skill => ({ skill, mastery: 0.25 })); // Give them a small starting boost
    await KnowledgeGraph.create({ user: user._id, nodes: initialNodes });
    
    console.log(`Successfully created user and initial Knowledge Graph for ${email}`);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  // ... (login logic remains the same as previous versions) ...
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};