import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
  useTheme,
  Button,
  CardContent,
  Grid,
  Slider,
  Rating,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CardElement from "../component/CardElement";
import Footer from "../component/Footer";
import Header from "../component/Header";
import LoadingBox from "../component/LoadingBox";
import Navbar from "../component/Navbar";
import SelectComponent from "../component/SelectComponent";
import { jobLoadAction } from "../redux/actions/jobAction";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import SearchInputEl from "../component/SearchInputEl";
import PopularProjects from "../component/ProjectCard";
import DrawerLeft from "../component/DrawerLeft";
import Cookies from 'js-cookie';
import RatingBar from "../component/RatingBar";
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Home = () => {
  const { pages, loading } = useSelector(
    (state) => state.loadJobs
  );


  const { keyword, location } = useParams();

  const [serviceProviders, setServiceProviders] = useState([]);
  const [setUniqueLocation, setSetUniqueLocation] = useState([]);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        console.log('keyword: ', keyword)
        console.log('location: ', location)
        // Include credentials with the request
        const response = await fetch(`http://localhost:9000/api/allServiceProviders/?keyword=${keyword||''}&location=${location||''}`, {
          credentials: "include", // This line is added to include cookies with the request
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        const taskers = data.serviceProviders.filter((serviceProvider) => serviceProvider.role === 'service provider');
        setSetUniqueLocation(data.setUniqueLocation)

        // console.log("data", data.users.filter((user) => user.role !== "admin"));
        setServiceProviders(taskers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchServiceProviders();
  }, [keyword, location]);

  console.log("all users", serviceProviders);

  const { palette } = useTheme();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [cat, setCat] = React.useState("");

useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
}, [dispatch, page, keyword, cat, location]);

useEffect(() => {
    dispatch(jobTypeLoadAction());
}, [dispatch]);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };
  const itemsPerPage = 6;
const [currentPage, setCurrentPage] = useState(1);

// Calculate total pages
const totalPages = Math.ceil(serviceProviders.length / itemsPerPage);

// Calculate the users to display on the current page
const indexOfLastServiceProvider = currentPage * itemsPerPage;
const indexOfFirstServiceProvider = indexOfLastServiceProvider - itemsPerPage;
const currentServiceProviders = serviceProviders.slice(indexOfFirstServiceProvider, indexOfLastServiceProvider);

// Handle change page
const handleChangePage = (event, newPage) => {
  setCurrentPage(newPage);
};
console.log(" hehehe", Cookies.get('token'))
const navigate = useNavigate();
const { serviceProviderId } = useParams();
const handleBookingClick = (serviceProviderId) => {
  navigate(`/booking/${serviceProviderId}`); // For React Router v5
};
  const [rating, setRating] = useState(3);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  return (
   <>
      <DrawerLeft>
        <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
          {/* Welcome section remains unchanged */}
          <Box
          sx={{
            textAlign: "center",
            py: 8,
            // background: 'url("https://cdn.pixabay.com/photo/2018/03/10/11/54/tool-3213915_960_720.jpg")',
            // background: 'url("https://images.pexels.com/photos/4491918/pexels-photo-4491918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', // Replace with your actual image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              component="h1"
              color="primary.main"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Welcome to HuzaHub!
            </Typography>
            <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'black', fontWeight: 'bold', marginBottom: '100px' }}>
              Discover trusted handyman services near you.
            </Typography>
            <SearchInputEl />
          </Container>
        </Box>
          <Container maxWidth="lg" sx={{ py: 5 }}>
            <Grid container spacing={4}>
              {/* Service Providers Section */}
              <Grid item xs={12} md={8} lg={9}>
              <Grid container spacing={3}>
                {currentServiceProviders.map((serviceProvider) => (
                  <Grid item xs={12} sm={6} md={4} key={serviceProvider._id}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        ':hover': {
                          transform: 'scale(1.01)',
                          transition: 'transform 1s ease-in-out',
                        },
                        width: '100%',
                      }}
                    > 
                    {/* <Grid sx={{height: "100"}}> */}
                      <Avatar
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mt: -6,
                          mb: 2,
                          border: '3px solid white', 
                          objectFit: 'cover',
                        }}
                        src={serviceProvider.avatarUrl} // Replace with the actual image path
                        alt={serviceProvider.username}
                      />
                      {/* </Grid> */}
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {serviceProvider.username}
                      </Typography>
                      <Typography variant="caption" display="block" gutterBottom>
                        {serviceProvider.description}
                      </Typography>
                      <Box sx={{ my: 2, width: '100%' }}>
                        <Grid container spacing={1} justifyContent="space-between">
                          <Grid >
                            <Typography variant="subtitle2" gutterBottom>Fee/$</Typography>
                            <Typography variant="text" sx={{ fontWeight: 'bold' }}>{serviceProvider.fee}</Typography>
                          </Grid>
                          <Grid>
                            <Typography variant="subtitle2" gutterBottom sx={{marginLeft: 5}}>
                              Service
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', whiteSpace: 'normal', textAlign: 'center' }}>
                              {serviceProvider.serviceType}
                            </Typography>
                          </Grid>

                          <Grid >
                            <Typography variant="subtitle2" gutterBottom>Location</Typography>
                            <Typography variant="text" sx={{ fontWeight: 'bold' }}>{serviceProvider.location}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ my: 1, width: '100%' }}>
                        <Typography variant="caption" display="block" gutterBottom>Rating</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            name="customized-icons"
                            value={rating}
                            onChange={handleRatingChange}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            icon={<StarIcon fontSize="inherit" />}
                          />
                          <Typography variant="body1" sx={{ ml: 1 }}>{rating}</Typography>
                        </Box>
                      </Box>
                      {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <RatingBar rating={user.rating} maxRating={5} />
                      </Box> */}
                      <Button 
                            variant="contained" 
                            sx={{ mt: 2, textDecoration: 'none', color: 'white' }}  
                            type="button" 
                            // href={`/booking/${serviceProvider._id}`}
                            //onClick={() => handleBookingClick(serviceProvider._id)}
                          >
                            <Link to={`/booking/${serviceProvider._id}`} style={{ textDecoration: "none", color: "white" }}>
                            Book Now
                            </Link>
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>

                {/* Pagination Control */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} />
                </Box>
              </Grid>

              {/* Filter Section */}
              <Grid item xs={12} md={4} lg={3}>
              <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        <Box sx={{ flex: 2, p: 2 }}>
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter service provider by category
                                    </Typography>
                                </Box>
                                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

                            </Card>

                            {/* jobs by location */}
                            <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2, bgcolor: palette.primary.white }}>
                                <Box sx={{ pb: 2 }}>
                                    {/* <h4>Filter by category</h4> */}
                                    <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                                        Filter service provider by location
                                    </Typography>
                                    <MenuList>
                                    {
                                            setUniqueLocation && setUniqueLocation.map((location, i) => (
                                                <MenuItem key={i}>
                                                    <ListItemIcon>
                                                        <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <Link style={{ color: palette.secondary.main }} to={`/search/location/${location}`}>{location}</Link>
                                                </MenuItem>

                                            ))
                                        }

                                    </MenuList>

                                </Box>
                            </Card>
                        </Box>
                      </Stack>
              </Grid>
               {/* Popular Projects Section */}
                {/* <Grid item xs={12} md={8} lg={9}>
                  <Box display="flex" justifyContent="center" marginBottom="50px">
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                      Popular Projects
                    </Typography>
                  </Box>
                  <Grid container spacing={4} justifyContent="center">
                    <PopularProjects />
                  </Grid>
                </Grid> */}
            </Grid>
          </Container>
        </Box>
        <Footer />
      </DrawerLeft>
    </>
  );
};

export default Home;
