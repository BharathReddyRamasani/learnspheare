import React from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Switch, FormControlLabel } from '@mui/material';
import { motion } from 'framer-motion';

const SettingsPage = () => {
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
            <Paper sx={{p: 4, borderRadius: 4, height: '100%'}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Change Password</Typography>
                <TextField fullWidth label="Current Password" type="password" sx={{ mb: 2, mt: 2 }} />
                <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
                <TextField fullWidth label="Confirm New Password" type="password" sx={{ mb: 2 }} />
                <Button variant="contained">Update Password</Button>
            </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
             <Paper sx={{p: 4, borderRadius: 4, height: '100%'}}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Notification Settings</Typography>
                <Box sx={{mt: 2}}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Email notifications for new courses" />
                    <FormControlLabel control={<Switch />} label="Weekly progress summary email" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Mobile push notifications" />
                </Box>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SettingsPage;