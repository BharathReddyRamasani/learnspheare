import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Button } from '@mui/material';
import { Dashboard, Person, School, Settings, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = () => {
    const { logout, userInfo } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/login'); };

    const menuItems = [
        { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
        { text: 'My Profile', icon: <Person />, path: '/profile' },
        { text: 'Courses', icon: <School />, path: '/courses' },
        { text: 'Settings', icon: <Settings />, path: '/settings' },
    ];

    const drawer = (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'primary.dark', // Darker sidebar background
            color: 'primary.contrastText',
            pb: 2
        }}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" component={NavLink} to="/" sx={{ textDecoration: 'none', color: 'primary.light' }}>
                    LearnSphere
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            <Box sx={{ p: 2, textAlign: 'center', py: 3 }}>
                <Typography variant="h6" sx={{ opacity: 0.8 }}>Welcome,</Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary.light">
                    {userInfo?.name}
                </Typography>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            <List sx={{ p: 1, flexGrow: 1 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ my: 1 }}>
                        <ListItemButton
                            component={NavLink}
                            to={item.path}
                            sx={{
                                borderRadius: 3,
                                py: 1.2,
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.active': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Stronger shadow for active
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: 'primary.contrastText',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ fontWeight: '500', fontSize: '1.05rem' }} primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<Logout />}
                    onClick={handleLogout}
                    sx={{ py: 1.5, borderRadius: 3, boxShadow: '0 4px 15px rgba(255, 111, 0, 0.4)' }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: 'none',
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Sidebar;