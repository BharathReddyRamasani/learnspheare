import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Grid, Button, Rating, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { useCourseData, useUserData } from '../hooks/useCourseData';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { getCourseById } = useCourseData();
  const { enrolledCourses, courseProgress, enrollInCourse } = useUserData();

  const course = getCourseById(courseId);
  const isEnrolled = enrolledCourses.includes(courseId);
  const progress = courseProgress[courseId] || 0;

  if (!course) {
    return <Container><Typography variant="h4" color="error">Course not found!</Typography></Container>;
  }

  const renderEnrollButton = () => {
    if (isEnrolled) {
        if (progress > 0) {
            return <Button variant="contained" size="large" sx={{ py: 1.5, px: 5 }}>Continue Course</Button>;
        }
        return <Button variant="contained" size="large" sx={{ py: 1.5, px: 5 }}>Get Started</Button>;
    }
    return <Button variant="contained" size="large" onClick={() => enrollInCourse(courseId)} sx={{ py: 1.5, px: 5 }}>Enroll Now</Button>;
  }

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Paper elevation={0} sx={{ p: {xs: 2, md: 5}, borderRadius: 4, bgcolor: 'primary.light', color: 'primary.contrastText', mb: 5 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>{course.title}</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>{course.longDescription}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating value={course.stats?.rating || 0} precision={0.1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                <Typography>{course.stats?.rating} average course rating</Typography>
            </Box>
            {renderEnrollButton()}
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: {xs: 'none', md: 'block'} }}>
            <img src={course.heroImageUrl} alt={course.title} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />
          </Grid>
        </Grid>
      </Paper>

      {/* Course Content */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>Course Content</Typography>
      {course.modules?.map((item, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemIcon sx={{minWidth: 40}}>
                    {item.type === 'video' && <VideocamIcon color="primary" />}
                    {item.type === 'pdf' && <PictureAsPdfIcon color="action" />}
                    {item.type.includes('quiz') && <QuizIcon color="secondary" />}
                </ListItemIcon>
                <Typography fontWeight="medium">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Details for this module or quiz would be displayed here, such as a video embed, a PDF viewer link, or the quiz questions.</Typography>
            </AccordionDetails>
          </Accordion>
      ))}
    </Container>
  );
};

export default CourseDetailPage;