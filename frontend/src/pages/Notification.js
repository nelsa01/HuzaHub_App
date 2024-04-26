import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import DrawerLeft from '../component/DrawerLeft';
import Footer from '../component/Footer';

const Notification = () => {
  const [selectedTab, setSelectedTab] = React.useState('all');

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const notifications = [
    { title: 'Your task was completed', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
    // ... more notifications
  ];

  return (
    <>
      <DrawerLeft>
      <Box sx={{ maxWidth: 400, mx: 'auto', minHeight: '100vh' }}>
        {/* <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Notification
        </Typography> */}
        <Tabs value={selectedTab} onChange={handleChangeTab} centered>
          <Tab label="All" value="all" />
          <Tab label="Responses" value="responses" />
        </Tabs>
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <Avatar><NotificationsIcon /></Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.content}
                      </Typography>
                      {/* Category Icon */}
                      {/* Category Label */}
                      {/* <Typography
                        sx={{ display: 'inline', ml: 0.5 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notification.category}
                      </Typography> */}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Footer />
      </DrawerLeft>
    </>
  );
};

export default Notification;
