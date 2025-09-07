import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const KnowledgeGraphVisualizer = ({ knowledgeModel = [] }) => {
    const getColor = (mastery) => {
        if (mastery > 0.8) return 'success';
        if (mastery > 0.5) return 'primary';
        if (mastery > 0.2) return 'warning';
        return 'error';
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Personal Knowledge Model</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
                {knowledgeModel.map((node, index) => (
                    <motion.div key={node.skill} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
                        <Chip
                            label={`${node.skill} (${Math.round(node.mastery * 100)}%)`}
                            color={getColor(node.mastery)}
                            variant="filled"
                        />
                    </motion.div>
                ))}
            </Box>
        </Paper>
    );
};

export default KnowledgeGraphVisualizer;