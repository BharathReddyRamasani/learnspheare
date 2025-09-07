import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Box, Typography, Stepper, Step, StepLabel, StepContent, Paper, Button, CircularProgress } from '@mui/material';

const RoadmapPage = () => {
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateRoadmap = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/learning/roadmap');
            setRoadmap(data.generatedRoadmap);
        } catch (error) {
            console.error("Failed to generate roadmap", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateRoadmap();
    }, []);

    return (
        <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>Your AI Career Roadmap</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                A personalized 3-month plan to help you reach your career goals.
            </Typography>

            {loading && <CircularProgress />}

            {roadmap.length > 0 && (
                <Stepper orientation="vertical">
                    {roadmap.map((week, index) => (
                        <Step key={index} active={true}>
                            <StepLabel>
                                <Typography variant="h6" fontWeight="bold">Week {week.week}: {week.theme}</Typography>
                            </StepLabel>
                            <StepContent>
                                <Paper sx={{p: 2, my: 1}}>
                                    <Typography fontWeight="bold">Technical Skills:</Typography>
                                    <Typography>{week.technical_skills.join(', ')}</Typography>
                                    <Typography fontWeight="bold" sx={{mt: 1}}>Soft Skill:</Typography>
                                    <Typography>{week.soft_skill}</Typography>
                                    <Typography fontWeight="bold" sx={{mt: 1}}>Mini Project:</Typography>
                                    <Typography>{week.mini_project_idea}</Typography>
                                </Paper>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            )}
        </Box>
    );
};

export default RoadmapPage;