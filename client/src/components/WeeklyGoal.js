// WeeklyGoal.js
import React from 'react';
import { Paper, Typography, Box, CircularProgress, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const WeeklyGoal = () => {
  const goalProgress = 75; const daysCompleted = 5; const totalDays = 7;
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Weekly Study Goal</Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', my: 2, alignSelf: 'center' }}>
        <CircularProgress variant="determinate" value={100} size={150} thickness={2} sx={{ color: 'grey.300' }} />
        <CircularProgress variant="determinate" value={goalProgress} size={150} thickness={4} color="primary" sx={{ position: 'absolute', left: 0, '& .MuiCircularProgress-circle': { strokeLinecap: 'round' } }} />
        <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography variant="h3" component="div" color="primary.main" fontWeight="bold">{`${goalProgress}%`}</Typography></Box>
      </Box>
      <Typography variant="h6" sx={{mb: 2}}>You're on fire! 🔥</Typography>
      <Box><Chip icon={<CheckCircleIcon />} label={`${daysCompleted} of ${totalDays} days`} color="success" variant="filled" /></Box>
    </Paper>
  );
};
export default WeeklyGoal;