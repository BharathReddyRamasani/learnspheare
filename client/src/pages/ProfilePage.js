import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Avatar, Button, TextField, Tabs, Tab, Chip, CircularProgress, Alert, Divider } from '@mui/material';
import { Edit as EditIcon, Lock as LockIcon, EmojiEvents as EmojiEventsIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (<Box sx={{ p: 4 }}>{children}</Box>)}
        </div>
    );
}

const ProfilePage = () => {
    const { userInfo, setUserInfo } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [profileData, setProfileData] = useState({ name: '', email: '', interests: [], skillLevel: '' });
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/users/profile');
                setProfileData(data);
            } catch (err) { setError('Failed to fetch profile data.'); } 
            finally { setLoading(false); }
        };
        fetchProfile();
    }, []);
    
    const handleTabChange = (event, newValue) => { setTabValue(newValue); };
    const handleInputChange = (e) => { setProfileData({ ...profileData, [e.target.name]: e.target.value }); };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true); setMessage(''); setError('');
        try {
            const { data } = await api.put('/users/profile', profileData);
            const updatedUserInfo = { ...userInfo, name: data.name, email: data.email };
            setUserInfo(updatedUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch(err) { setError('Failed to update profile.'); } 
        finally { setLoading(false); }
    };

    if (loading && !profileData.name) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                    My Profile
                </Typography>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Avatar sx={{ width: 150, height: 150, margin: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '4rem' }}>
                                    {profileData.name.charAt(0).toUpperCase()}
                                </Avatar>
                            </motion.div>
                            <Typography variant="h4" fontWeight={600}>{profileData.name}</Typography>
                            <Typography color="text.secondary" gutterBottom>{profileData.email}</Typography>
                            <Chip label={profileData.skillLevel} color="secondary" sx={{ mt: 2, fontSize: '1rem', padding: '10px' }}/>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Paper>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
                                    <Tab label="Profile Settings" icon={<EditIcon />} iconPosition="start" />
                                    <Tab label="Change Password" icon={<LockIcon />} iconPosition="start" />
                                    <Tab label="Achievements" icon={<EmojiEventsIcon />} iconPosition="start" />
                                </Tabs>
                            </Box>
                            <TabPanel value={tabValue} index={0}>
                                <Typography variant="h5" fontWeight={600} gutterBottom>Edit Your Information</Typography>
                                {(message || error) && ( <Alert severity={error ? "error" : "success"} sx={{ my: 2 }}>{error || message}</Alert> )}
                                <Box component="form" onSubmit={handleUpdateProfile} sx={{ mt: 3 }}>
                                    <TextField fullWidth label="Full Name" name="name" value={profileData.name} onChange={handleInputChange} sx={{ mb: 3 }} />
                                    <TextField fullWidth label="Email" name="email" value={profileData.email} onChange={handleInputChange} sx={{ mb: 3 }} />
                                    <Button type="submit" variant="contained" disabled={loading}>
                                        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                                    </Button>
                                </Box>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <Typography variant="h5" fontWeight={600} gutterBottom>Change Your Password</Typography>
                                <Box sx={{ mt: 3 }}>
                                    <TextField fullWidth label="Current Password" type="password" sx={{ mb: 3 }} />
                                    <TextField fullWidth label="New Password" type="password" sx={{ mb: 3 }} />
                                    <TextField fullWidth label="Confirm New Password" type="password" sx={{ mb: 3 }} />
                                    <Button variant="contained">Update Password</Button>
                                </Box>
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                <Typography variant="h5" fontWeight={600} gutterBottom>Your Achievements</Typography>
                                <Typography color="text.secondary" sx={{ mt: 2 }}>No achievements unlocked yet. Keep learning!</Typography>
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};

export default ProfilePage;