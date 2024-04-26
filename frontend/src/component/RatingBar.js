import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingBar = ({ rating, maxRating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.floor(maxRating - rating);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(filledStars)].map((_, index) => (
        <StarIcon key={index} sx={{ color: 'primary.main' }} />
      ))}
      {hasHalfStar && <StarHalfIcon sx={{ color: 'primary.main' }} />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon key={index} sx={{ color: 'primary.main' }} />
      ))}
      <Typography variant="caption" sx={{ ml: 1, fontWeight: 'bold' }}>
        {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default RatingBar;
