import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error('Error caught by Error Boundary:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (<Box sx={{ p: 4, m: 'auto', maxWidth: 600 }}><Paper sx={{ p: 4, textAlign: 'center' }}><Typography variant="h4" color="error" gutterBottom>Something went wrong.</Typography><Typography variant="body1" sx={{ mb: 2 }}>Please try refreshing the page.</Typography><Button variant="contained" onClick={() => window.location.reload()}>Refresh</Button></Paper></Box>);
    }
    return this.props.children;
  }
}
export default ErrorBoundary;