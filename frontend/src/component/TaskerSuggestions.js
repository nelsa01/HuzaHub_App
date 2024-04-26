import React from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Box,
  Typography
} from '@mui/material';

const suggestions = [
  { name: 'Lorem ipsum dolor', info: 'Lorem ipsum dolor sit amet', avatar: 'https://images.pexels.com/photos/8832738/pexels-photo-8832738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Tunga Uwase', info: 'Lorem ipsum dolor sit amet', avatar: 'https://images.pexels.com/photos/8832738/pexels-photo-8832738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Claudine Ineza', info: 'Lorem ipsum dolor sit amet', avatar: 'https://images.pexels.com/photos/8832738/pexels-photo-8832738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  // ...more suggestions
];

const TaskerSuggestions = () => {
  return (
    <Box sx={{ width: '70%', bgcolor: 'background.paper' }}>
      <Typography variant="h5" sx={{ pl: 2, pt: 2, pb: 1, fontWeight: 'bold' }}>
        Hire a Service Provider
      </Typography>
      <List>
        {suggestions.map((suggestion, index) => (
                    <ListItem key={index} secondaryAction={
                      <Button variant="contained" sx={{ bgcolor: 'theme.palette.primary.main' }}>
                      <Link
                        to="/register"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                          Hire
                      </Link>
                        
                      </Button>
                    }>
            <ListItemAvatar>
              <Avatar src={suggestion.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={suggestion.name}
              secondary={suggestion.info}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary">
          See more suggestions
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskerSuggestions;
