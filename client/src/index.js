import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7', // Deeper purple
      light: '#9a67ea',
      dark: '#320b86',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Vibrant orange
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    success: { main: '#4caf50', light: '#80e27e' },
    info: { main: '#2196f3', light: '#6ec6ff' },
    warning: { main: '#ffc107', light: '#fff350' },
    error: { main: '#f44336', light: '#ff7961' },
    background: {
      default: '#F5F7FA', // Light grey for general background
      paper: '#FFFFFF',   // White for cards/components
    },
    text: {
      primary: '#212121', // Darker text for readability
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', // Using Poppins for a modern feel
    fontSize: 14, // Slightly smaller base font
    h1: { fontSize: '3.5rem', fontWeight: 700 },
    h2: { fontSize: '2.8rem', fontWeight: 700 },
    h3: { fontSize: '2.2rem', fontWeight: 600 },
    h4: { fontSize: '1.8rem', fontWeight: 600 },
    h5: { fontSize: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '1.2rem', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 }, // No uppercase buttons
  },
  shape: { borderRadius: 16 }, // More rounded corners
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Subtle shadow for depth
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded buttons
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);