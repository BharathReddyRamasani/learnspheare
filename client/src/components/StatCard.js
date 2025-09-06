import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, description }) => {
  const theme = useTheme();
  const iconColor = theme.palette[color]?.main || theme.palette.primary.main;
  const bgColor = theme.palette[color]?.light || theme.palette.primary.light;

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0px 8px 25px rgba(0,0,0,0.15)' }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Paper sx={{
        p: 3,
        borderRadius: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column', // Changed to column for better vertical alignment
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        textAlign: 'center', // Center text
        transition: 'all 0.3s ease',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
        '&::before': { // Subtle background pattern
          content: '""',
          position: 'absolute',
          top: -20,
          left: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: `${bgColor}20`, // Lighter shade of background color
          opacity: 0.7,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: `${bgColor}20`,
          opacity: 0.7,
        }
      }}>
        <Box sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: bgColor, // Background from theme
          color: iconColor, // Icon color from theme
          flexShrink: 0,
          mb: 1,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          zIndex: 1, // Ensure icon is above pseudo-elements
        }}>
          <Icon sx={{ fontSize: '36px' }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" sx={{ zIndex: 1 }}>{value}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 0.5, zIndex: 1 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, zIndex: 1 }}>
            {description}
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
};

export default StatCard;