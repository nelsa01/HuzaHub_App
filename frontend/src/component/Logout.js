// import { useSelector } from 'react-redux';import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

// const LogoutButton = ({ logOutServiceProvider, logOutUser }) => {
//     const { userInfo } = useSelector(state => state.signIn);
//           // log out user
//           const logOutUser = () => {
//             dispatch(userLogoutAction());
//             window.location.reload(true);
//             setTimeout(() => {
//                 navigate('/');
//             }, 500)
//           }
//           const logOutServiceProvider = () => {
//             dispatch(userLogoutAction());
//             window.location.reload(true);
//             setTimeout(() => {
//                 navigate('/');
//             }, 500)
//           }
//     // Handle case where userInfo is null
//     if (!userInfo) {
//       return null; // or return a loading indicator, redirect, etc.
//     }
  
//     // If userInfo is not null, proceed with rendering the component
//     const handleClick = userInfo.role === "client" ? logOutUser : logOutServiceProvider;
  
//     return (
//       <ListItem 
//         button 
//         onClick={handleClick} // Assuming logOutUser is your logout function
//         sx={{ fontWeight: 'bold'}} // Make bold always
//       >
//         <ListItemIcon>
//           <Logout />
//         </ListItemIcon>
//         <ListItemText 
//           primary="Sign out"
//           primaryTypographyProps={{ fontWeight: 'bold' }} // Bold text always
//         />
//       </ListItem>
//     );
//   };
  