import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box, LinearProgress, Button, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';

const ContinueLearningCard = ({ course }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Paper sx={{
      p: 3,
      borderRadius: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'primary.main', // Dark background for contrast
      color: 'primary.contrastText',
      overflow: 'hidden',
      position: 'relative',
      '&::before': { // Abstract shape for visual interest
        content: '""',
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: '50%',
        bgcolor: 'rgba(255,255,255,0.08)',
        zIndex: 0,
      },
      '&::after': { // Another abstract shape
        content: '""',
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: '50%',
        bgcolor: 'rgba(255,255,255,0.05)',
        zIndex: 0,
      }
    }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ zIndex: 1 }}>Continue Learning</Typography>
      <CardMedia
        component="img"
        image={course?.imageUrl}
        alt={course?.title || "Course Image"}
        sx={{
          height: 160,
          width: '100%',
          borderRadius: 3,
          objectFit: 'cover',
          my: 2,
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          zIndex: 1
        }}
      />
      <Box sx={{ flexGrow: 1, mt: 1, zIndex: 1 }}>
        <Typography variant="h5" component="h3" fontWeight="bold">{course?.title}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
          <Typography variant="body2" fontWeight="bold">Progress</Typography>
          <Typography variant="body2" fontWeight="bold" color="secondary.light">{course?.progress}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={course?.progress}
          sx={{
            height: 12,
            borderRadius: 5,
            bgcolor: 'rgba(255,255,255,0.3)', // Lighter track for contrast
            '& .MuiLinearProgress-bar': {
              bgcolor: 'secondary.main', // Use secondary color for progress
            },
          }}
        />
      </Box>
      <Button
        component={Link}
        to={`/courses/${course?.id}`}
        variant="contained"
        size="large"
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 3,
          bgcolor: 'secondary.main',
          '&:hover': { bgcolor: 'secondary.dark' },
          boxShadow: '0 4px 15px rgba(255, 111, 0, 0.4)',
          zIndex: 1
        }}
      >
        Resume Learning
      </Button>
    </Paper>
  </motion.div>
);
export default ContinueLearningCard;