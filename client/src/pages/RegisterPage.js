import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Grid, FormControlLabel, Checkbox, Chip, Select, MenuItem, FormControl, InputLabel, Link, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const interestsOptions = ['JavaScript', 'Python', 'Data Science', 'Machine Learning', 'Web Development', 'React', 'Node.js'];
const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [],
    skillLevel: 'Beginner',
    terms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }, []);
  
  const handleInterestToggle = useCallback((interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.terms) {
      setError("You must accept the terms and conditions.");
      return;
    }
    setError('');
    setLoading(true);
    await register(formData.name, formData.email, formData.password, formData.interests, formData.skillLevel);
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ my: 5 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Paper elevation={16} sx={{ borderRadius: 5, p: { xs: 3, md: 6 } }}>
          <Typography variant="h3" component="h1" fontWeight="bold" align="center" sx={{ mb: 2 }} color="primary">
            Create Your Learning Profile
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
            Join our community and start your personalized journey today.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>General Information</Typography>
                <TextField fullWidth required label="Full Name" name="name" value={formData.name} onChange={handleInputChange} sx={{ mb: 3 }} />
                <TextField fullWidth required label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} sx={{ mb: 3 }} />
                <TextField fullWidth required label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} sx={{ mb: 3 }} />
                <TextField fullWidth required label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>Learning Preferences</Typography>
                <Typography gutterBottom color="text.secondary">Select Your Interests</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                  {interestsOptions.map(interest => (
                    <Chip key={interest} label={interest} onClick={() => handleInterestToggle(interest)} clickable variant={formData.interests.includes(interest) ? 'filled' : 'outlined'} color="primary" />
                  ))}
                </Box>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="skill-level-label">Select Your Skill Level</InputLabel>
                  <Select labelId="skill-level-label" name="skillLevel" value={formData.skillLevel} onChange={handleInputChange} label="Select Your Skill Level">
                    {skillLevels.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <FormControlLabel
                  control={<Checkbox name="terms" checked={formData.terms} onChange={handleInputChange} />}
                  label={
                      <Typography variant="body1">
                      I accept the <Link component={RouterLink} to="/terms" sx={{ fontWeight: 'bold' }}>Terms and Conditions</Link>.
                      </Typography>
                  }
              />
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, py: 1.5, px: 8, fontSize: '1.2rem', borderRadius: 3, textTransform: 'none' }}
              >
                  {loading ? <CircularProgress size={28} color="inherit" /> : 'Create Account'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default RegisterPage;