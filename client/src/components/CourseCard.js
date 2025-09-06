
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ course, onClick }) => {
  return (
    <Card sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt={course.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" component="div" color="text.primary">
          {course.title} Career Accelerator
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Your career in {course.title.toLowerCase()} starts here.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ★ {course.rating} ({course.ratingsCount} ratings)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {course.hours} total hours
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          sx={{ mt: 2 }}
        >
          Get Started - {course.price}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          ≈ {course.enrolled.toLocaleString()} learners already enrolled
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
