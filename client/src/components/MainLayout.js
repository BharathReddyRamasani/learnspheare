import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import GeminiChatbot from './GeminiChatbot'; // Import the chatbot

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - 260px)` }, bgcolor: '#F5F7FA' }}>
        <Toolbar />
        <Outlet />
      </Box>
      <GeminiChatbot /> {/* Add the chatbot here */}
    </Box>
  );
};
export default MainLayout;