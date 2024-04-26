import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const ServiceCard = ({ service, index, variants }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
  
    // Ensures the element is there to be observed
    if (ref.current) {
      observer.observe(ref.current);
    }
  
    // Cleanup function to unobserve
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4} ref={ref}>
      <motion.div
        custom={index}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
      >
        <Card
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              ".MuiCardContent-root": { color: "white" },
            },
            width: 300, // Adjust width to make the card square
            height: 200, // Adjust height to make the card square
          }}
          onClick={() => console.log(`Clicked on ${service.title}`)}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", textAlign: "center"}}>
              {service.title}
            </Typography>
            <Typography variant="body2">
              {service.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default ServiceCard;
