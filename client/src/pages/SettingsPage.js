import React from 'react';
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const SettingsPage = () => {
  // In a real app, you would connect this to your user state and API
  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account and notification preferences.
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <Paper sx={{p: 4, borderRadius: 4}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Change Password</Typography>
                <TextField fullWidth label="Current Password" type="password" sx={{ mb: 2, mt: 2 }} />
                <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
                <TextField fullWidth label="Confirm New Password" type="password" sx={{ mb: 2 }} />
                <Button variant="contained">Update Password</Button>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
             <Paper sx={{p: 4, borderRadius: 4}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Notification Settings</Typography>
                 <Typography color="text.secondary" sx={{mt: 2}}>
                    This is where notification toggles (e.g., for email summaries, new course alerts) would go.
                </Typography>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;