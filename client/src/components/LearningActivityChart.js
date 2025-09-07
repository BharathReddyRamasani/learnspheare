import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const LearningActivityChart = ({ knowledgeModel = [] }) => {
  const theme = useTheme();
  // We process the raw model to get the top 10 skills for the chart
  const chartData = knowledgeModel
    .sort((a, b) => b.mastery - a.mastery)
    .slice(0, 10)
    .map(node => ({ name: node.skill, mastery: Math.round(node.mastery * 100) }));
  
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%', minHeight: 350, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" fontWeight="bold">Top Skills Mastery</Typography>
      <Box sx={{ flexGrow: 1, mt: 3, ml: -3 }}>
        <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} /><YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} /><Tooltip /><Bar dataKey="mastery" fill={theme.palette.primary.main} radius={[0, 4, 4, 0]} name="Mastery" /></BarChart></ResponsiveContainer>
      </Box>
    </Paper>
  );
};
export default LearningActivityChart;