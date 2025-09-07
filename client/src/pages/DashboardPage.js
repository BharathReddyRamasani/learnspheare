import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import StatCard from '../components/StatCard';
import LearningActivityChart from '../components/LearningActivityChart';
import RecentActivity from '../components/RecentActivity';
import KnowledgeGraphVisualizer from '../components/KnowledgeGraphVisualizer';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { School, EmojiEvents, BarChart, AccessTime } from '@mui/icons-material';

const DashboardPage = () => {
    const { userInfo } = useAuth();
    const { learningState } = useProgress();

    const stats = {
        coursesCompleted: learningState?.knowledgeModel.filter(n => n.mastery > 0.9).length || 0,
        points: learningState?.points || 0,
        totalHours: Math.round(learningState?.knowledgeModel.reduce((acc, n) => acc + n.mastery * 10, 0)) || 0, // Simplified calculation
    };

    return (
        <Box>
            <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>Dashboard</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Welcome back, {userInfo?.name?.split(' ')[0] || 'Learner'}!
            </Typography>

            <Grid container spacing={4}>
                {/* --- ROW 1: STATS & GRAPH --- */}
                <Grid item xs={12} lg={8}>
                    <LearningActivityChart knowledgeModel={learningState?.knowledgeModel} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}><StatCard title="Skills Mastered" value={stats.coursesCompleted} icon={EmojiEvents} color="success" /></Grid>
                        <Grid item xs={12} sm={6}><StatCard title="Points Earned" value={stats.points} icon={BarChart} color="warning" /></Grid>
                        <Grid item xs={12}><RecentActivity activity={learningState?.recentActivity} /></Grid>
                    </Grid>
                </Grid>
                
                {/* --- ROW 2: KNOWLEDGE GRAPH --- */}
                <Grid item xs={12}>
                    <KnowledgeGraphVisualizer knowledgeModel={learningState?.knowledgeModel} />
                </Grid>
            </Grid>
        </Box>
    );
};
export default DashboardPage;