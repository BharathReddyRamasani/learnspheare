import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import CoursePreviewCard from '../components/CoursePreviewCard'; // Use the new card
import { motion } from 'framer-motion';
import { useCourseData } from '../hooks/useCourseData';

const CourseListPage = () => {
  const { courses } = useCourseData();
  return (
    <Container maxWidth="lg">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          My Courses
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
          Get the skills and real-world experience employers want.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {courses.map(course => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CoursePreviewCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseListPage;