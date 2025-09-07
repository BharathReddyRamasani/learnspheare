import KnowledgeGraph from '../models/KnowledgeGraph.js';
import Course from '../models/Course.js';
import { generateDynamicQuiz } from '../services/aiService.js';
import { recommendCourses } from '../services/recommendationService.js';

// Get the user's entire learning profile for the dashboard
export const getLearningProfile = async (req, res) => {
  try {
    const profile = await KnowledgeGraph.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Learning profile not found.' });
    res.json(profile);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// Get course recommendations
export const getRecommendations = async (req, res) => {
  try {
    const userKnowledgeGraph = await KnowledgeGraph.findOne({ user: req.user._id });
    const allCourses = await Course.find({});
    if (!userKnowledgeGraph || !allCourses) return res.status(404).json({ message: 'Data not found.'});
    
    const recommendations = recommendCourses(userKnowledgeGraph, allCourses);
    res.json(recommendations.slice(0, 5)); // Return top 5 recommendations
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// Generate a personalized quiz
export const getPersonalizedQuiz = async (req, res) => {
  try {
    const userKnowledgeGraph = await KnowledgeGraph.findOne({ user: req.user._id });
    if (!userKnowledgeGraph) return res.status(404).json({ message: 'Learning profile not found.'});

    const quiz = await generateDynamicQuiz(userKnowledgeGraph);
    res.json(quiz);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// Update progress after completing a module/quiz
export const updateProgress = async (req, res) => {
    const { skill, isCorrect } = req.body; // e.g., skill: 'React Hooks', isCorrect: true
    try {
        const graph = await KnowledgeGraph.findOne({ user: req.user._id });
        const node = graph.nodes.find(n => n.skill === skill);

        const learningRate = 0.1; // How much each interaction affects mastery
        if (node) {
            // Update existing skill node
            const currentMastery = node.mastery;
            const newMastery = isCorrect 
                ? currentMastery + (1 - currentMastery) * learningRate // Move towards 1
                : currentMastery - currentMastery * learningRate; // Move towards 0
            node.mastery = Math.max(0, Math.min(1, newMastery)); // Clamp between 0 and 1
            node.lastUpdated = Date.now();
        } else {
            // Add new skill node if it doesn't exist
            graph.nodes.push({ skill, mastery: 0.15 });
        }

        await graph.save();
        res.json({ message: 'Progress updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};