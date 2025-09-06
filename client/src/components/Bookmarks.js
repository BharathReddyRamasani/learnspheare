import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Box, Chip } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Bookmarks = ({ bookmarks = [] }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>My Bookmarks</Typography>
      <List disablePadding>
        {bookmarks.map((bookmark, index) => (
          <ListItem
            key={bookmark.id}
            disablePadding
            sx={{
              my: 1,
              alignItems: 'flex-start',
              '&:not(:last-child)': { borderBottom: '1px dashed rgba(0,0,0,0.05)', pb: 1 }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1" fontWeight="medium">{bookmark.title}</Typography>}
            />
            {bookmark.time && (
              <Chip
                label={bookmark.time}
                size="small"
                sx={{
                  bgcolor: 'info.light',
                  color: 'info.dark',
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Bookmarks;