import React from 'react';
import { Paper, Typography } from '@mui/Mui/material';
const QuizViewer = () => (
    <Paper sx={{p: 4}}>
        <Typography variant="h4">Quiz Title</Typography>
        <Typography>Quiz questions would be rendered here.</Typography>
    </Paper>
);
export default QuizViewer;