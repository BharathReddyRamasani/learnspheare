import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, IconButton, InputAdornment, Link, Divider, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff, Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    }, [error]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(formData.email, formData.password);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    }, [formData, login]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Container component="main" maxWidth="md">
                <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Paper elevation={16} sx={{ borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                        {/* Form Section */}
                        <Box sx={{ p: { xs: 4, md: 6 }, flex: 1 }}>
                            <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 1 }}>LearnSphere</Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>Welcome back, Learner!</Typography>
                            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField fullWidth required margin="normal" label="Email" name="email" value={formData.email} onChange={handleInputChange} />
                                <TextField
                                    fullWidth
                                    required
                                    margin="normal"
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>Forgot Password?</Link>
                                <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                                    {loading ? <CircularProgress size={26} color="inherit" /> : 'Sign In'}
                                </Button>
                                <Divider sx={{ my: 3 }}>OR</Divider>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <IconButton sx={{ border: '1px solid #ddd' }}><GoogleIcon /></IconButton>
                                    <IconButton sx={{ border: '1px solid #ddd' }}><GitHubIcon /></IconButton>
                                </Box>
                                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                                    No account?{' '}
                                    <Link component={RouterLink} to="/register" sx={{ fontWeight: 'bold' }}>Create one</Link>
                                </Typography>
                            </Box>
                        </Box>
                        {/* Image Section */}
                        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
                            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070" alt="Learning Environment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;