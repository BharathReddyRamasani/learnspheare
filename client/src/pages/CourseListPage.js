import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import CoursePreviewCard from '../components/CoursePreviewCard';
import { motion } from 'framer-motion';
import { useCourseData } from '../data/courseData'; // Corrected import path

const CourseListPage = () => {
  const { courses } = useCourseData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
  };

  return (
    <Container maxWidth="lg">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Explore Courses
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
          Find the perfect course to advance your skills and career.
        </Typography>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Grid container spacing={4}>
          {courses.map(course => (
            <Grid item key={course.id} xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants} style={{height: '100%'}}>
                <CoursePreviewCard course={course} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CourseListPage;

