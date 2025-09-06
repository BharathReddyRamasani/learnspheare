import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import StatCard from '../components/StatCard';
import LearningActivityChart from '../components/LearningActivityChart';
import ContinueLearningCard from '../components/ContinueLearningCard';
import RecentActivity from '../components/RecentActivity';
import Achievements from '../components/Achievements';
import RecommendedCourses from '../components/RecommendedCourses';
import Bookmarks from '../components/Bookmarks'; // Import the new component

import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; // For the new stat card

import { useDashboardData } from '../hooks/useDashboardData';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const { userInfo } = useAuth();
  const { stats, learningActivity, continueLearningCourse, recentActivity, achievements, recommendedCourses, bookmarks } = useDashboardData();
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2 }}>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            bgcolor: 'primary.main', // Primary color for the banner
            color: 'primary.contrastText',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            minHeight: { xs: 120, md: 150 }, // Ensure consistent height
            boxShadow: theme.shadows[4], // Stronger shadow for emphasis
            '&::before': { // Abstract shapes for visual interest
              content: '""',
              position: 'absolute',
              top: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.1)',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -70,
              right: -70,
              width: 250,
              height: 250,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.08)',
              zIndex: 0,
            }
          }}
        >
          <Box sx={{ zIndex: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              Welcome, {userInfo?.name?.split(' ')[0]}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
              Let's make today a productive learning day!
            </Typography>
          </Box>
        </Paper>
      </motion.div>

      <Grid container spacing={4}>
        {/* Top Row: Learning Activity Chart & Continue Learning */}
        <Grid item xs={12} md={8}> {/* Chart takes more space now */}
          <LearningActivityChart data={learningActivity} />
        </Grid>
        <Grid item xs={12} md={4}> {/* Continue Learning is here */}
          <ContinueLearningCard course={continueLearningCourse} />
        </Grid>

        {/* New layout for Stat Cards - now two rows, similar to concept */}
        <Grid item xs={12}>
            <Grid container spacing={4}>
                {/* First Row of Stats */}
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Enrolled" value={stats.coursesEnrolled} icon={SchoolIcon} color="info" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Completed" value={stats.coursesCompleted} icon={EmojiEventsIcon} color="success" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Points" value={stats.pointsEarned} icon={BarChartIcon} color="warning" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Hours" value={stats.totalHours} icon={AccessTimeIcon} color="secondary" />
                </Grid>
            </Grid>
        </Grid>


        {/* Bottom Row: Recommended Courses, Recent Activity, Bookmarks, Achievements */}
        <Grid item xs={12} lg={6}> {/* Recommended courses & Recent Activity */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <RecommendedCourses courses={recommendedCourses} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RecentActivity activity={recentActivity} />
            </Grid>
          </Grid>
        </Grid>
        
        {/* Bookmarks and Achievements */}
        <Grid item xs={12} lg={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Bookmarks bookmarks={bookmarks} /> {/* New Bookmarks Component */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Achievements achievements={achievements} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;