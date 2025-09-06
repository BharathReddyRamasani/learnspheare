import express from 'express';
import { getCourses, addCourse } from '../controllers/courseController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCourses);
router.post('/', addCourse); // An unprotected route to add dummy data

export default router;