import { useMemo } from 'react';

// This is the master source of all course information in the application.
export const allCoursesData = {
  'full-stack-developer': {
    id: 'full-stack-developer',
    title: 'Full Stack Web Developer',
    category: 'Full-Stack',
    longDescription: 'Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace and expand your earnings potential.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400',
    heroImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800',
    stats: { rating: 4.7, reviews: '458k', hours: 87.8 },
    totalModules: 10,
    modules: [
      { title: 'Module 1: HTML & CSS Foundations', type: 'video', duration: 45 },
      { title: 'Module 2: Advanced CSS & Flexbox', type: 'pdf', duration: 30 },
      { title: 'Quiz 1: CSS Concepts', type: 'quiz', questions: 10 },
      { title: 'Module 3: JavaScript Fundamentals', type: 'video', duration: 60 },
      { title: 'Module 4: Asynchronous JavaScript', type: 'video', duration: 75 },
      { title: 'Quiz 2: JavaScript Logic', type: 'quiz', questions: 15 },
      { title: 'Module 5: React & State Management', type: 'video', duration: 90 },
      { title: 'Module 6: Node.js & Express API', type: 'pdf', duration: 60 },
      { title: 'Quiz 3: Backend Fundamentals', type: 'quiz', questions: 12 },
      { title: 'Final Test: Full Stack Challenge', type: 'final_test', questions: 30 },
    ],
  },
  'digital-marketer': {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400',
    stats: { rating: 4.5, reviews: '3.6k', hours: 28.4 },
    totalModules: 8,
    modules: [], // Add module details for this course
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1573495627361-d9b87960b12d?q=80&w=400',
    stats: { rating: 4.6, reviews: '221k', hours: 47.1 },
    totalModules: 12,
    modules: [], // Add module details for this course
  },
};

// This is the hook that provides the course data to your components.
// It MUST be exported from this file.
export const useCourseData = () => {
  const courses = useMemo(() => Object.values(allCoursesData), []);
  
  const getCourseById = (id) => {
    return allCoursesData[id];
  };

  return { courses, getCourseById };
};

