import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
  Menu, // Import the Menu component
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import Dashboard from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import DarkMode from '@mui/icons-material/DarkMode'; // Import the DarkMode component
import { palette } from '@mui/material/styles'; // Import the 'palette' variable from the '@mui/material/styles' package
import LightMode from '@mui/icons-material/LightMode'; // Import the LightMode component
import { userLogoutAction } from '../redux/actions/userAction'; // Import the userLogoutAction function from the appropriate module
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import the 'useNavigate' hook from the 'react-router-dom' package
import { useTheme } from '@mui/material/styles'; // Import the 'useTheme' hook from the '@mui/material/styles' package
import { toggleActionTheme } from '../redux/actions/themeAction' // Import the toggleActionTheme function from the appropriate module
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom'; // Import the 'useLocation' hook from the 'react-router-dom' package

const drawerWidth = 240;
const pages = ['Home', 'Log In'];
const Navbar = () => {
  const menuItems = [
    
    { text: 'Home', icon: <HomeIcon /> , path: '/home'},
    { text: 'Notifications', icon: <NotificationsIcon /> , path: '/notifications'},
    { text: 'Tasks Booked', icon: <Dashboard />, path: '/userdashboard' },
    
  ];
const location = useLocation();
const { userInfo } = useSelector(state => state.signIn);
console.log(userInfo)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // log out user
    const logOutUser = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }
    


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ overflow: 'auto'}}>
        <List>
                    {menuItems.map((item, index) => (
                        <ListItem 
                            button 
                            key={item.text}
                            component={Link} 
                            to={item.path}
                            selected={location.pathname === item.path} // Highlight if current page matches
                            sx={{
                                fontWeight: location.pathname === item.path ? 'bold' : 'normal', // Bold if selected
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
        <Divider />
        <Box sx={{marginTop: '300px', p: 2 }}>
                <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                    {palette.mode === "dark" ? (
                        <DarkMode sx={{ color: "#808080", fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: "808080", fontSize: "25px" }} />
                    )}
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip >
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar sx={{ color: 'grey' }} alt="Remy Sharp" src="" />
                            {
                            !userInfo ?

                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center"><Link style={{ textDecoration: "none", color: 'black' }} to="/login">Log In</Link></Typography>
                                </MenuItem> :

                                <MenuItem onClick={logOutUser}>
                                    <Typography style={{ textDecoration: "none", color: 'black'}} textAlign="center">Log Out</Typography>
                                </MenuItem>
                        }
                        </IconButton>
                    </Tooltip>
                  
                    <Menu
                        PaperProps={{
                            sx: {
                                "& 	.MuiMenu-list": {
                                    bgcolor: "primary.white",
                                    color: "white"
                                },
                            }
                        }}

                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                        {/* <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/admin/dashboard">Service provider Dashboard</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center"><Link style={{ textDecoration: "none", color: palette.secondary.main }} to="/user/dashboard">Client Dashboard</Link></Typography>
                        </MenuItem> */}

                        


                    </Menu>
                </Box>

        </Box>
      </Box>
    </Drawer>
  );
};

export default Navbar;
