import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'primary.main',
      }}
    >
      <CircularProgress color="secondary" />
      <Typography variant="h4" component="h1" sx={{ color: 'secondary.contrastText', mt: 2 }}>
        Welcome to HuzaHub!
      </Typography>
    </Box>
  );
};

export default SplashScreen;
