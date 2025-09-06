import React from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'; // A slightly more premium icon

const Achievements = ({ achievements = [] }) => (
  <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
    <Typography variant="h6" fontWeight="bold" gutterBottom>Achievements & Badges</Typography>
    <List disablePadding>{achievements.map((item, index) => (
        <ListItem key={index} disablePadding sx={{ my: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 40 }}><MilitaryTechIcon color="warning" /></ListItemIcon>
            <ListItemText
                primary={<Typography variant="body1" fontWeight="medium">{item.name}</Typography>}
            />
        </ListItem>
    ))}</List>
  </Paper>
);
export default Achievements;