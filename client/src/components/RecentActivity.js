import React from 'react';
import { Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';

const recentActivityData = [
    { type: 'completed', course: 'JavaScript ES6+', time: '2 hours ago', points: 50 },
    { type: 'started', course: 'Node.js Fundamentals', time: '1 day ago', points: 0 },
    { type: 'quiz', course: 'React Testing', time: '2 days ago', points: 30 },
];

const activityIcons = {
    completed: { icon: <AutoStoriesIcon />, color: '#4CAF50' }, // Green
    started: { icon: <PlayCircleIcon />, color: '#2196F3' }, // Blue
    quiz: { icon: <QuizIcon />, color: '#FFC107' } // Amber
};

const RecentActivity = () => {
    return (
        <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Recent Activity</Typography>
            <List disablePadding>
                {recentActivityData.map((act, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{
                            my: 1.5,
                            alignItems: 'flex-start',
                            '&:not(:last-child)': { borderBottom: '1px dashed rgba(0,0,0,0.05)', pb: 1.5 }
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: activityIcons[act.type]?.color, color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                {activityIcons[act.type]?.icon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1" fontWeight="medium">{act.course}</Typography>}
                            secondary={<Typography variant="body2" color="text.secondary">{act.time}</Typography>}
                            sx={{ mr: 1 }}
                        />
                        {act.points > 0 && (
                            <Box sx={{
                                bgcolor: 'success.light',
                                color: 'success.dark',
                                px: 1,
                                py: 0.5,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                whiteSpace: 'nowrap'
                            }}>
                                +{act.points} pts
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentActivity;