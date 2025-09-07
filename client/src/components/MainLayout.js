import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import GeminiChatbot from './GeminiChatbot';
import { useProgress } from '../context/ProgressContext';

const MainLayout = () => {
  const { loading } = useProgress();
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - 260px)` }, bgcolor: '#F5F7FA' }}>
        <Toolbar />
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        ) : (
            <Outlet />
        )}
      </Box>
      <GeminiChatbot />
    </Box>
  );
};
export default MainLayout;