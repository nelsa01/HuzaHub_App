import React from 'react';
import { Box, Typography, Paper, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TodayIcon from '@mui/icons-material/Today';
import ChatIcon from '@mui/icons-material/Chat';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { List } from '@mui/material';

const HowItWorks = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box style={{ position: 'relative', width: '100%', paddingTop: '50px', paddingBottom: '50px' }}>
      <img 
        src="https://img.freepik.com/free-photo/close-up-young-handsome-man-isolated_273609-37395.jpg?t=st=1709544910~exp=1709548510~hmac=42d5c71150623d0fe58f1ae84d9428c30932c51b2ccf83b55052e1938ddc5584&w=900" // Replace with your image path
        alt="Background"
        style={{ 
          position: 'absolute', 
          width: '40%', 
          height: '100%', 
        //   left: 20, 
          bottom: 20,
        //   marginBottom: '50px', 
          zIndex: -1,
          justifyContent: 'center',
          alignItems: 'center', 
          objectFit: 'cover' 
        }} 
      />
      <Grid container maxWidth='xl' spacing={2} justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom align={matches ? 'left' : 'center' } sx={{fontWeight: 'bold'}}>
            How it works
          </Typography>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <ListAltIcon color="secondary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Choose a Service provider by price, skills, and reviews." />
                                </ListItem>
                                <ListItem>
                                <ListItemIcon>
                                    <TodayIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Schedule a Service provider as early as today." />
                                </ListItem>
                <ListItem>
                <ListItemIcon>
                    <ChatIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Pay, tip, and review all in one place." />
                </ListItem>
            </List>
           </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;
