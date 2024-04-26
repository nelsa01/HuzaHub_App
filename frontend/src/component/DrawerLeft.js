import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle } from '@mui/icons-material';
import { History } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleActionTheme } from '../redux/actions/themeAction';
import LightMode from '@mui/icons-material/LightMode'; 
import DarkMode from '@mui/icons-material/DarkMode';
import Login from '@mui/icons-material/Login'
import { Logout } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userLogoutAction } from '../redux/actions/userAction'; 
import LandingPage from '../pages/Landingpage';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: drawerWidth, // Ensures the Main content is pushed to the right
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerLeft = ({ children }) => {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const { userInfo } = useSelector(state => state.signIn);
  console.log(userInfo)

        // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
        navigate('/');
    }, 500)
  }
  // const logOutServiceProvider = () => {
  //   dispatch(userLogoutAction());
  //   window.location.reload(true);
  //   setTimeout(() => {
  //       navigate('/');
  //   }, 500)
  // }

  var menuItems=[
    { text: 'Home', icon: <HomeIcon /> , path: '/home'},
  ];
  if(userInfo){
    menuItems = [
      
      userInfo.role == "client" ? { text: 'Home', icon: <HomeIcon />, path: '/home' }:{ text: 'Bookings', icon: <HomeIcon />, path: '/fetchbooking'},
      // { text: 'Notifications', icon: <NotificationsIcon /> , path: '/notification'},
      userInfo.role == "client" ? { text: 'Bookings', icon: <HomeIcon />, path: '/fetchbooking' }:{ text: 'Profile', icon: <AccountCircle />, path: '/admindashboard' },
      // userInfo.role == "service provider" ? { text: 'Profile', icon: <AccountCircle />, path: '/admindashboard'},
      
    ]
  }


  // const LogoutButton = ({logOutServiceProvider, logOutUser });
  // const handleClick = userInfo.role === "client" ? logOutUser : logOutServiceProvider;

  const location = useLocation();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <Typography variant="h6" noWrap component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          HuzaHub
        </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent" // Drawer is always visible
        open // Prop open is always true for permanent drawer
      >
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
        {menuItems.map((item, index) => (
                        <ListItem 
                        button 
                        key={item.text}
                        component={Link} 
                        to={item.path}
                        selected={location.pathname === item.path} // Highlight if current page matches
                        sx={{
                          fontWeight: location.pathname === item.path ? 'bold' : 'normal', // Make bold if selected
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional: change on hover
                            '& .MuiListItemText-primary': {
                              fontWeight: 'bold', // Bold text on hover
                            },
                          },
                        }}
                      >
                        <ListItemIcon >{item.icon}</ListItemIcon>
                        <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                            fontWeight: 'bold' // Bold text always
                          }}
                        />
                      </ListItem>
                    ))}
        </List>
        <Divider />
        <List sx={{mt: 50}}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(toggleActionTheme())}>
            <ListItemIcon>
              {palette.mode === "dark" ? (
                <DarkMode sx={{ color: "#808080", fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: "808080", fontSize: "25px" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={palette.mode === "dark" ? "Light Mode" : "Dark Mode"} primaryTypographyProps={{ fontWeight: 'bold' }}/>
          </ListItemButton>
        </ListItem>

            {!userInfo ? (
              <ListItem 
                button 
                component={Link} 
                to={"/login"}
                selected={location.pathname === "/login"} // Highlight if current page matches
                sx={{ fontWeight: 'bold'}} // Make bold always
              >
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText 
                  primary="Sign in"
                  primaryTypographyProps={{ fontWeight: 'bold' }} // Bold text always
                />
              </ListItem>
            ) : (
              <ListItem 
                button 
                onClick={logOutUser}
                sx={{ fontWeight: 'bold'}} // Make bold always
                >
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText 
                    primary="Sign out"
                    primaryTypographyProps={{ fontWeight: 'bold' }} // Bold text always
                />
                </ListItem>
            )}  
        </List>
      </Drawer>
      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default DrawerLeft;
