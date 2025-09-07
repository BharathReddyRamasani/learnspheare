import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Divider, Grid, Button, Rating, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCourseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';
const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { getCourseById } = useCourseData();
  const { progress, enrollInCourse, completeModule, getCourseProgress } = useProgress();
  const [tabValue, setTabValue] = useState(0);
  const course = getCourseById(courseId);
  const isEnrolled = progress.enrolledCourses.includes(courseId);
  const userProgress = getCourseProgress(courseId);
  const completedModules = progress.completedModules[courseId] || [];
  if (!course) { return <Container><Typography variant="h4" color="error">Course not found!</Typography></Container>; }
  const handleTabChange = (event, newValue) => { setTabValue(newValue); };
  const renderEnrollButton = () => {
    if (isEnrolled) {
      if (userProgress > 0) { return <Button variant="contained" size="large" sx={{ py: 1.5, px: 5 }}>Continue Course ({userProgress}%)</Button>; }
      return <Button variant="contained" size="large" onClick={() => completeModule(courseId, course.modules[0].title, course.modules[0].type)} sx={{ py: 1.5, px: 5 }}>Get Started</Button>;
    }
    return <Button variant="contained" size="large" onClick={() => enrollInCourse(courseId)} sx={{ py: 1.5, px: 5 }}>Enroll Now</Button>;
  };
  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: {xs: 2, md: 5}, borderRadius: 4, bgcolor: 'primary.light', color: 'primary.contrastText', mb: 5 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}><Typography variant="h2" fontWeight="bold" gutterBottom>{course.title}</Typography><Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>{course.longDescription}</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}><Rating value={course.stats?.rating || 0} precision={0.1} readOnly emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} /><Typography>{course.stats?.rating} average rating</Typography></Box>{renderEnrollButton()}</Grid>
          <Grid item xs={12} md={5} sx={{ display: {xs: 'none', md: 'block'} }}><img src={course.heroImageUrl} alt={course.title} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} /></Grid>
        </Grid>
      </Paper>
      {isEnrolled && (<Grid container spacing={4}><Grid item xs={12} md={8}><Paper sx={{p: 2, borderRadius: 4}}><Tabs value={tabValue} onChange={handleTabChange}><Tab label="Video Content" icon={<VideocamIcon />} iconPosition="start" /><Tab label="PDF Notes" icon={<PictureAsPdfIcon />} iconPosition="start" /></Tabs><Box sx={{p: 2, mt: 2, height: 450, bgcolor: 'black', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{tabValue === 0 && <Typography color="white">Video Player for selected module.</Typography>}{tabValue === 1 && <Typography color="white">PDF viewer for selected module.</Typography>}</Box></Paper></Grid><Grid item xs={12} md={4}><Paper sx={{ p: 2, borderRadius: 4, height: '100%' }}><Typography variant="h5" fontWeight="bold" sx={{ p: 2 }}>Course Content</Typography><List>{course.modules?.map((item, index) => { const isCompleted = completedModules.includes(item.title); return (<ListItem key={index} button onClick={() => completeModule(courseId, item.title, item.type)} divider><ListItemIcon>{isCompleted ? <CheckCircleIcon color="success" /> : (item.type.includes('quiz') ? <QuizIcon color="secondary" /> : <VideocamIcon color="action" />)}</ListItemIcon><ListItemText primary={item.title} /></ListItem>); })}</List></Paper></Grid></Grid>)}
    </Container>
  );
};
export default CourseDetailPage;