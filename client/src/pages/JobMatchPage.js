import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Chip, LinearProgress } from '@mui/material';

const JobMatchPage = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMatches = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/jobs/matches');
                setMatches(data);
            } catch (error) {
                console.error("Failed to fetch job matches", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const getMatchColor = (score) => {
        if (score > 75) return 'success';
        if (score > 50) return 'primary';
        return 'warning';
    };

    return (
        <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>Placement Readiness</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                See how your skills match up against real-time job openings.
            </Typography>
            
            <Paper sx={{p: 3}}>
                {loading ? <CircularProgress /> : (
                    <List>
                        {matches.map(match => (
                            <ListItem key={match.jobId} divider>
                                <ListItemText 
                                    primary={<Typography fontWeight="bold">{match.title} at {match.company}</Typography>}
                                />
                                <Box sx={{width: 200, ml: 2}}>
                                    <LinearProgress variant="determinate" value={match.matchScore} color={getMatchColor(match.matchScore)} sx={{height: 10, borderRadius: 5}}/>
                                </Box>
                                <Chip label={`${match.matchScore}% Match`} color={getMatchColor(match.matchScore)} sx={{ml: 2}}/>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Box>
    );
};

export default JobMatchPage;