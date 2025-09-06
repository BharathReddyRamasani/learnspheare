import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Badge, Box, Tooltip, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { Notifications as NotificationsIcon, Person as PersonIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => { handleClose(); logout(); navigate('/login'); };
    return (
        <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - 260px)` }, ml: { sm: `260px` }, backgroundColor: 'rgba(245, 247, 250, 0.7)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #ddd' }}>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Tooltip title="Notifications"><IconButton color="default" sx={{ mr: 1 }}><Badge badgeContent={4} color="secondary"><NotificationsIcon /></Badge></IconButton></Tooltip>
                <Tooltip title="Account settings"><IconButton onClick={handleMenu}><Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>{userInfo?.name?.charAt(0).toUpperCase() || <PersonIcon />}</Avatar></IconButton></Tooltip>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} PaperProps={{ elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))', mt: 1.5 } }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                    <MenuItem component={Link} to="/profile"><ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>Profile</MenuItem><Divider />
                    <MenuItem onClick={handleLogout}><ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
export default Header;