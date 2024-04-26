import React from 'react';
import StatComponent from './StatComponent';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const StatCircleComponent = ({ value, icon, description, money }) => {
  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: '50%',
    backgroundColor: '#3f51b5',
    color: 'white',
  };

  const progressStyle = {
    position: 'absolute',
    zIndex: 1,
  };

  const contentStyle = {
    zIndex: 2,
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', m: 2 }}>
      <CircularProgress variant="determinate" value={100} size={150} thickness={4} sx={{ color: 'grey.300' }} />
      <CircularProgress variant="determinate" value={value * 10} size={150} thickness={4} style={progressStyle} />
      <Card sx={cardStyle}>
        <CardContent sx={contentStyle}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            {icon}
            <Typography variant="h5" component="div">
              {money}{value}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatCircleComponent;
