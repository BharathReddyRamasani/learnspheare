import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const RecommendedCourses = ({ courses = [] }) => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>Recommended Courses</Typography>
    <List disablePadding>
      {courses.map((course) => (
        <ListItem disableGutters key={course.id} sx={{ my: 1.5 }}>
          <ListItemAvatar>
            <Avatar src={course.imageUrl} sx={{ width: 50, height: 50, borderRadius: 2, mr: 1.5 }} variant="square" />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="body1" fontWeight="medium">{course.title}</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">by {course.instructor}</Typography>}
          />
          <Button
            component={Link}
            to={`/courses/${course.id}`}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            View
          </Button>
        </ListItem>
      ))}
    </List>
  </Paper>
);
export default RecommendedCourses;