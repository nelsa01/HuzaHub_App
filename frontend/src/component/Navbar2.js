import { AppBar, Toolbar, Button, useTheme, Menu, MenuItem, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Link } from "react-router-dom";

const Navbarr = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  


  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: palette.primary.main }}>
    <Toolbar sx={{ padding: '0 24px', justifyContent: 'space-between' }}>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <WorkIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          HuzaHub
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: theme.spacing(2) }}>
        <Button
          sx={{
            fontWeight: 'bold',
            bgcolor: 'white',
            color: palette.primary.main,

            '&:hover': {
              bgcolor: palette.primary.main,
              color: 'white',
            },
          }}
          component="a"
          href="#footer"
        >
          About us
        </Button>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          variant="contained"
          sx={{
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'white',
              color: palette.primary.main,
            },
          }}
        >
          Sign in
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={RouterLink} to="/login">
            As a Client
          </MenuItem>
          <MenuItem onClick={handleClose} component={RouterLink} to="/signin">
            As a Service Provider
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default Navbarr;
