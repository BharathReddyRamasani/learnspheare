import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { getLearningProfile, getRecommendations, getPersonalizedQuiz, updateProgress } from '../controllers/learningController.js';

const router = express.Router();

router.get('/profile', protect, getLearningProfile);
router.get('/recommendations', protect, getRecommendations);
router.get('/quiz', protect, getPersonalizedQuiz);
router.post('/progress', protect, updateProgress);

export default router;