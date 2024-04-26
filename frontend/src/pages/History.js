import React, { useState } from 'react';
import { Box, Button, Tabs, Tab, Typography, List, ListItem, Divider, Paper } from '@mui/material';
import DrawerLeft from '../component/DrawerLeft';
import Footer from '../component/Footer';
import { useNavigate } from "react-router-dom";
// Sample data for booked services
const services = {
  pending: [
    { id: 1, name: 'Plumbing Repair', date: '2024-03-15' },
    { id: 2, name: 'Electrical Installation', date: '2024-03-20' }
  ],
  completed: [
    { id: 3, name: 'Room Painting', date: '2024-03-01' },
    { id: 4, name: 'Furniture Assembly', date: '2024-02-25' }
  ]
};

const History = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleConfirmService = (serviceId) => {
    // Handle the confirmation action here
    // You might want to call an API to update the service status
    navigate("/confirm");
  };

  const renderServiceList = (serviceType) => (
    <List>
      {services[serviceType].map((service) => (
        <React.Fragment key={service.id}>
          <ListItem
            secondaryAction={
              serviceType === 'pending' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleConfirmService(service.id)}
                  to='/confirm'
                >
                  Confirm
                </Button>
              )
            }
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{service.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {service.date}
              </Typography>
            </Box>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <>
      <DrawerLeft>
      <Box sx={{ maxWidth: 400, mx: 'auto', minHeight: '100vh' }}>
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
              <Tab label="Pending Services" />
              <Tab label="Completed Services" />
            </Tabs>
            <Box role="tabpanel" hidden={selectedTab !== 0} sx={{ p: 2 }}>
              {selectedTab === 0 && renderServiceList('pending')}
            </Box>
            <Box role="tabpanel" hidden={selectedTab !== 1} sx={{ p: 2 }}>
              {selectedTab === 1 && renderServiceList('completed')}
            </Box>
        </Box>
        <Footer />
      </DrawerLeft>
    </>
  );
};

export default History;
