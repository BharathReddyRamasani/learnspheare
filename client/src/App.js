import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import CourseListPage from './pages/CourseListPage';
import RoadmapPage from './pages/RoadmapPage';
import JobMatchPage from './pages/JobMatchPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/jobs" element={<JobMatchPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
export default App;