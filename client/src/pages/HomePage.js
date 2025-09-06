
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Avatar, IconButton, TextField, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { Psychology, TrendingUp, ArrowForward, Chat } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PublicNavbar from '../components/PublicNavbar';

const features = [
  { icon: <Psychology color="primary" sx={{ fontSize: 50 }} />, title: 'AI-Powered Learning', description: 'Adaptive paths that adjust to your pace.' },
  { icon: <TrendingUp color="secondary" sx={{ fontSize: 50 }} />, title: 'Progress Tracking', description: 'Real-time analytics to monitor your journey.' },
];

const GeminiChat = () => {
  const [messages, setMessages] = useState([{ text: 'Hello! I’m Gemini, your learning assistant. How can I help you today?', sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return 'Great choice! Check out our courses like Full Stack Web Developer or Data Scientist on the Courses page. Want to start now?';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I’m here to help! Tell me what you need assistance with, or visit the Dashboard for more options.';
    } else if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
      const date = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });
      return `It’s currently ${date} IST. How can I assist you further?`;
    } else {
      return 'Interesting! I can assist with learning tips, course details, or general questions. What’s on your mind?';
    }
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');

      // Mock response for now; replace with API call
      setTimeout(() => {
        const botReply = getBotResponse(input);
        setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
      }, 1000);

      // Uncomment and configure for real Gemini API (requires REACT_APP_GEMINI_API_KEY in .env)
      /*
      try {
        const response = await fetch('http://localhost:5000/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.REACT_APP_GEMINI_API_KEY,
          },
          body: JSON.stringify({ prompt: input }),
        });
        const data = await response.json();
        setTimeout(() => setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]), 1000);
      } catch (error) {
        console.error('Error fetching Gemini response:', error);
        setTimeout(() => setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Try again!', sender: 'bot' }]), 1000);
      }
      */
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)} sx={{ position: 'fixed', bottom: 20, right: 20 }}>
        <Chat sx={{ fontSize: 40 }} />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Chat with Gemini</DialogTitle>
        <DialogContent>
          <List sx={{ maxHeight: '400px', overflowY: 'auto', mb: 2 }}>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end' }}>
                <ListItemText
                  primary={msg.text}
                  sx={{
                    bgcolor: msg.sender === 'bot' ? '#e3f2fd' : '#f5e6cc',
                    p: 2,
                    borderRadius: 2,
                    maxWidth: '70%',
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage}>Send</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const handleGetStarted = () => navigate(userInfo ? '/dashboard' : '/register');

  return (
    <Box>
      <PublicNavbar />
      <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 15, textAlign: 'center' }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography variant="h1" component="h1" gutterBottom>Welcome to LearnSphere</Typography>
            <Typography variant="h5" sx={{ my: 4, opacity: 0.9 }}>Your personalized journey to mastery begins here.</Typography>
            <Button variant="contained" color="secondary" size="large" endIcon={<ArrowForward />} onClick={handleGetStarted} sx={{ py: 1.5, px: 5, fontSize: '1.2rem' }}>Get Started Now</Button>
          </motion.div>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 8 }}>Why Choose LearnSphere?</Typography>
        <Grid container spacing={5}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ textAlign: 'center', p: 3, height: '100%' }}>
                  <Avatar sx={{ bgcolor: 'transparent', width: 80, height: 80, margin: 'auto', mb: 2 }}>{feature.icon}</Avatar>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>{feature.title}</Typography>
                    <Typography color="text.secondary">{feature.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <GeminiChat />
    </Box>
  );
};

export default HomePage;
