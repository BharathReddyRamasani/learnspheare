import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CoursePreviewCard = ({ course }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} style={{ height: '100%' }}>
      <Card component={Link} to={`/courses/${course.id}`} sx={{ textDecoration: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="180"
          image={course.imageUrl}
          alt={course.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
            {course.title}
          </Typography>
          {course.stats && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
              <Rating name="read-only" value={course.stats.rating} precision={0.1} readOnly />
              <Typography variant="body2">{course.stats.reviews} ratings</Typography>
              <Typography variant="body2">{course.stats.hours} total hours</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CoursePreviewCard;