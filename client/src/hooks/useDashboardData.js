import { useMemo } from 'react';
export const useDashboardData = () => {
  const stats = useMemo(() => ({ coursesCompleted: 12, pointsEarned: 2850, coursesEnrolled: 8, totalHours: 84 }), []);
  const learningActivity = useMemo(() => [{ date: 'Mon', hours: 1.5 }, { date: 'Tue', hours: 2 }, { date: 'Wed', hours: 1 }, { date: 'Thu', hours: 3 }, { date: 'Fri', hours: 2.5 }, { date: 'Sat', hours: 4 }, { date: 'Sun', hours: 1.5 }], []);
  const continueLearningCourse = useMemo(() => ({ id: 'advanced-react-patterns', title: 'Advanced React Patterns', progress: 67, imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop' }), []);
  const recentActivity = useMemo(() => [{ type: 'completed', course: 'JavaScript ES6+', time: '2 hours ago', points: 50 }, { type: 'started', course: 'Node.js Fundamentals', time: '1 day ago', points: 0 }, { type: 'quiz', course: 'React Testing', time: '2 days ago', points: 30 }], []);
  const achievements = useMemo(() => [{ name: "10 Courses Completed" }, { name: "Perfect Score" }, { name: "Weekend Warrior" }], []);
  const recommendedCourses = useMemo(() => [
    { id: 'nodejs-masterclass', title: "Node.js Masterclass", instructor: "David Lee", imageUrl: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=80&auto=format&fit=crop' },
    { id: 'advanced-css', title: "Advanced CSS & Sass", instructor: "Jane Doe", imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd953bb7c2?q=80&w=80&auto=format&fit=crop' }
  ], []);
  const bookmarks = useMemo(() => [
    { id: 'react-hooks-guide', title: "React Hooks Guide", time: '5 mins left' },
    { id: 'css-flexbox-mastery', title: "CSS Flexbox Mastery", time: '12 mins left' },
    { id: 'javascript-closures', title: "JavaScript Closures", time: '8 mins left' }
  ], []);

  return { stats, learningActivity, continueLearningCourse, recentActivity, achievements, recommendedCourses, bookmarks };
};