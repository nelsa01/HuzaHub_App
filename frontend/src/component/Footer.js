import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from "@mui/material/styles";

const Footer = () => {
    const theme = useTheme();
    const { palette } = useTheme();

  return (
    <Box id='footer' component="footer" sx={{ bgcolor: palette.primary.main, color: 'white', py: 3}}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit">
              About HuzaHub
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mt: 1 }}>
              Connecting clients with trusted service providers for home repairs and improvements.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
      <Typography variant="h6" color="inherit" sx={{marginLeft: 15}}>
        Services
      </Typography>
      <Grid container spacing={2}>
        {/* First row */}
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Cleaning Services" />
            </ListItem>
          </Grid>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Electrical Services" />
            </ListItem>
          </Grid>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Gardening Services" />
            </ListItem>
          </Grid>
        </Grid>
        {/* Second row */}
        <Grid item xs={12} container>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Furniture Assembly Services" />
            </ListItem>
          </Grid>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Heavy Lifting Services" />
            </ListItem>
          </Grid>
          <Grid item xs={4}>
            <ListItem>
              <ListItemText primary="Plumbing Services" />
            </ListItem>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit">
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="inherit" sx={{ mt: 4, display: 'block', textAlign: 'center' }}>
          © {new Date().getFullYear()} HuzaHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
