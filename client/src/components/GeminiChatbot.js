// This component is new and should be created
import React, { useState } from 'react';
import { Fab, Paper, Typography, Box, TextField, IconButton } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
const GeminiChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <><Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1301 }} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <CloseIcon /> : <SmartToyIcon />}</Fab>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.8 }} transition={{ duration: 0.3 }}>
                        <Paper elevation={8} sx={{ position: 'fixed', bottom: 110, right: 32, width: 350, height: 500, borderRadius: 4, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1300 }}>
                            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}><Typography variant="h6" fontWeight="bold">Gemini AI Assistant</Typography></Box>
                            <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}><Typography>Hello! How can I help you learn today?</Typography></Box>
                            <Box component="form" sx={{ p: 1, display: 'flex', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}><TextField fullWidth variant="outlined" size="small" placeholder="Ask anything..." /><IconButton color="primary" type="submit"><SendIcon /></IconButton></Box>
                        </Paper>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default GeminiChatbot;