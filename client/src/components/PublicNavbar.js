import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
const PublicNavbar = () => {
  return (
    <AppBar position="absolute" color="transparent" elevation={0} sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3, py: 1 }}><Typography variant="h5" fontWeight="bold" component={NavLink} to="/" sx={{ textDecoration: 'none', color: 'primary.main' }}>LearnSphere</Typography><Box><Button component={NavLink} to="/login" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', mr: 1 }}>Login</Button><Button component={NavLink} to="/register" variant="contained" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Sign Up</Button></Box></Toolbar>
    </AppBar>
  );
};
export default PublicNavbar;