import { useMemo, useState } from 'react';

// --- MASTER DATA SOURCE ---
const allCoursesData = {
  'full-stack-developer': {
    id: 'full-stack-developer',
    title: 'Full Stack Web Developer',
    longDescription: 'Your career in full stack web development starts here. Fast-track learning and interview prep. Grow your skills at your own pace and expand your earnings potential.',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400',
    heroImageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800',
    stats: { rating: 4.7, reviews: '458k', hours: 87.8 },
    modules: [
      { title: 'Module 1: HTML & CSS Foundations', type: 'video' }, { title: 'Module 2: Advanced CSS & Flexbox', type: 'pdf' },
      { title: 'Quiz 1: CSS Concepts', type: 'quiz' }, { title: 'Module 3: JavaScript Fundamentals', type: 'video' },
      { title: 'Module 4: Asynchronous JavaScript', type: 'video' }, { title: 'Quiz 2: JavaScript Logic', type: 'quiz' },
      { title: 'Module 5: React & State Management', type: 'video' }, { title: 'Module 6: Node.js & Express API', type: 'pdf' },
      { title: 'Quiz 3: Backend Fundamentals', type: 'quiz' }, { title: 'Final Test: Full Stack Challenge', type: 'final_test' },
    ],
  },
  'digital-marketer': { id: 'digital-marketer', title: 'Digital Marketer', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400' /* ... add more details ... */ },
  'data-scientist': { id: 'data-scientist', title: 'Data Scientist', imageUrl: 'https://images.unsplash.com/photo-1573495627361-d9b87960b12d?q=80&w=400' /* ... add more details ... */ },
};

// --- MOCK USER STATE ---
// This hook simulates fetching user data and provides functions to update it.
export const useUserData = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(['full-stack-developer']);
    const [courseProgress, setCourseProgress] = useState({ 'full-stack-developer': 25 });

    const enrollInCourse = (courseId) => {
        if (!enrolledCourses.includes(courseId)) {
            setEnrolledCourses(prev => [...prev, courseId]);
            setCourseProgress(prev => ({ ...prev, [courseId]: 0 }));
        }
    };

    return { enrolledCourses, courseProgress, enrollInCourse };
};


export const useCourseData = () => {
  const courses = useMemo(() => Object.values(allCoursesData), []);
  const getCourseById = (id) => {
    return allCoursesData[id];
  };
  return { courses, getCourseById };
};