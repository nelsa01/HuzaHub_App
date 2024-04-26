import React from 'react';
import { Box, Button, Container, Typography, Paper, ToggleButton, ToggleButtonGroup, TextField, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

export default function ConfirmTask() {
  const [taskCompletion, setTaskCompletion] = React.useState(null);
  const [feedback, setFeedback] = React.useState('');
  const [supportMessage, setSupportMessage] = React.useState('');
  const [rating, setRating] = React.useState(2);

  const handleCompletionChange = (event, newCompletion) => {
    setTaskCompletion(newCompletion);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSupportMessageChange = (event) => {
    setSupportMessage(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const navigate = useNavigate();
  // Placeholder function for submit logic
  const handleSubmit = () => {
    console.log('Submit:', { taskCompletion, feedback, supportMessage, rating });
    // Add logic to handle submission here
    navigate("/home");
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Confirm service completion
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom sx={{fontWeight: 'semi-bold' }}>
          Has the service been satisfactorily completed?
        </Typography>

        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center'}}>
          <ToggleButtonGroup
            color="primary"
            value={taskCompletion}
            exclusive
            onChange={handleCompletionChange}
          >
            <ToggleButton value="yes">Yes</ToggleButton>
            <ToggleButton value="no">No</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
        <Typography paragraph sx={{fontWeight: 'bold', mb: 2 }}>
          Rate your service provider
        </Typography>
          <Rating
            name="feedback-rating"
            value={rating}
            onChange={(event, newRating) => handleRatingChange(newRating)}
          />
        </Box>

        <Typography paragraph>
          Any feedback?
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          sx={{mb: 2}}
        //   margin=''
        />

        <Typography paragraph>
          Need assistance?
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Support"
          value={supportMessage}
          onChange={handleSupportMessageChange}
        //   margin="normal"
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="outlined" color="secondary">
            Support
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}