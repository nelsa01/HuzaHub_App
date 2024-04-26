import { Box, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000,
  };

  const slidesData = [
    // Replace with your actual data and add more slides as needed
    { id: 1, title: 'Cleaning Services', image: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, title: 'Electrical Services', image: 'https://img.freepik.com/free-photo/top-view-circuit-board-repair_23-2148419141.jpg?t=st=1709382126~exp=1709385726~hmac=cf6aef048f23b55d5bf42e12cf71c9073d4586d2f972c5d680b203b1de3bcbb9&w=900' },
    { id: 3, title: 'Gardening Services', image: 'https://images.pexels.com/photos/6509144/pexels-photo-6509144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, title: 'Furniture Assembly Services', image: 'https://images.pexels.com/photos/4554425/pexels-photo-4554425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, title: 'Heavy Lifting Services', image: 'https://images.pexels.com/photos/7464232/pexels-photo-7464232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, title: 'Plumbing Services', image: 'https://img.freepik.com/free-photo/plumbing-repair-service_181624-27146.jpg?w=900&t=st=1709380581~exp=1709381181~hmac=6db72d32fe96444c7fd21195d8c2b24bcfe2861e44113d8cc1734eed606c3a4c' },
    // ... more slides
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {/* Adjust the width of the slider here */}
      <Box sx={{ width: '100%', overflow: 'hidden', }}> {/* Example: Makes the slider smaller and caps its max width */}
        <Slider {...settings}>
          {slidesData.map(slide => (
            <Box key={slide.id} sx={{ position: 'relative', width: '100%', height: '674px', overflow: 'hidden'}}>
              <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Box
                sx={{
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  color: 'white',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '100%',
                }}
              >
                <Typography variant="h6" >{slide.title}</Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default SlickSlider;
