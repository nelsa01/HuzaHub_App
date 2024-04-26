import React from 'react';
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Avatar,
  Grid,
  Link,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddIcon from '@mui/icons-material/Add';

const BookingDetails = () => {
  return (
    <>
     <Box sx={{ p: 2, maxWidth: 400, mx: 'auto', bgcolor: 'background.paper', borderRadius: 2, mt: 10 }}>
      <DialogTitle>
        Booking Details
        <IconButton edge="end" size="small" style={{ float: 'right' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Meeting with Norch Team
        </Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="February 17, 2022" secondary="Add time" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  Samantha Harvey
                </Grid>
                <Grid item xs={12}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  Jonathan Christine
                </Grid>
                <Grid item xs={12}>
                  <Button startIcon={<AddIcon />}>Add guest</Button>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Has not added" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VideoCallIcon />
            </ListItemIcon>
            <Button variant="contained" color="primary">
              Join with Google Meet
            </Button>
          </ListItem>
        </List>
        <Divider />
        <Link href="#" variant="body2" style={{ float: 'right' }}>
          Copy link
        </Link>
      </DialogContent>
     </Box>
    </>
  );
};

export default BookingDetails;
