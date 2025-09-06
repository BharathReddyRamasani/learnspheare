import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const LearningActivityChart = ({ data }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <Paper sx={{
        p: 3,
        borderRadius: 4,
        height: '100%',
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.08)',
      }}>
        <Typography variant="h6" fontWeight="bold">Learning Activity</Typography>
        <Box sx={{ flexGrow: 1, mt: 3, ml: -3 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
              <XAxis dataKey="date" tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
              <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper,
                  border: 'none',
                }}
                itemStyle={{ color: theme.palette.text.primary }}
                labelStyle={{ color: theme.palette.text.secondary }}
              />
              <Bar
                dataKey="hours"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
                name="Study Hours"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default LearningActivityChart;