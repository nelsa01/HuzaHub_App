import React, { useState } from 'react';
import {
  Paper, Typography, Grid, IconButton, Tooltip, styled,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ArrowForwardIos } from '@mui/icons-material';

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Updated CalendarDay with background color change on selection
const CalendarDay = styled(Typography)(({ theme, isselected, iscurrent, isdayselected }) => ({
  width: '40px',
  lineHeight: '40px',
  borderRadius: '50%',
  backgroundColor: isdayselected ? 'red' : isselected ? theme.palette.primary.main : 'none',
  color: iscurrent ? 'red' : 'inherit',
  textAlign: 'center',
}));

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null); // State to track the selected day

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Function to handle day click
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <CustomPaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h4" component="h2" style={{ display: 'inline' }}>
            {currentDate.getMonth() + 1} {currentDate.getFullYear()}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIos />
          </IconButton>
        </Grid>
        <Grid item container spacing={2}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <Grid item xs key={day} style={{ flexBasis: '14.28%' }}>
              <Typography variant="button" display="block" textAlign="center">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container spacing={2}>
          {[...Array(firstDayOfMonth).keys()].map((empty) => (
            <Grid item key={`empty-${empty}`} style={{ flexBasis: '14.28%' }} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <Grid item key={day} style={{ flexBasis: '14.28%' }}>
              <Tooltip title="Events" placement="top">
                <CalendarDay
                  variant="body2"
                  component="p"
                  onClick={() => handleDayClick(day + 1)} // Add onClick event to update the selected day
                  isselected={day === 16} // Update these as per your logic
                  iscurrent={currentDate.getDate() === day + 1 && currentDate.getMonth() === new Date().getMonth()}
                  isdayselected={selectedDay === day + 1} // Update background color based on selected day
                >
                  {day + 1}
                </CalendarDay>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </CustomPaper>
  );
};

export default Calendar;