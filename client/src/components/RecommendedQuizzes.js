// RecommendedQuizzes.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
const RecommendedQuizzes = ({ quizzes = [] }) => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>Recommended Quizzes</Typography>
    <List>{quizzes.map(item => (<ListItem key={item.id} disablePadding><ListItemIcon sx={{minWidth: 32}}><QuizIcon color="secondary" /></ListItemIcon><ListItemText primary={item.title} /></ListItem>))}</List>
  </Paper>
);
export default RecommendedQuizzes;