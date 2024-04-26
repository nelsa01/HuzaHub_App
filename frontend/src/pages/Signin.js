import React from 'react';
import { Box, Button, TextField, Typography, Linkk } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { serviceProviderSignin } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { Avatar, Checkbox, FormControlLabel} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(serviceProviderSignin({...values, role:"service provider"}));
            // Here you would navigate to the dashboard or other appropriate page on successful login
            actions.resetForm();
            navigate('/fetchbooking');
        }
    });

    
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            bgcolor: 'background.default',
          }}>
          <Box
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '10px',
              boxShadow: 3,
              width: '100%',
              maxWidth: '340px',
              bgcolor: 'background.paper',
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in as a Service Provider
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  color="primary"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Button href="/signup" color="primary">
                Sign up
              </Button>
            </Typography>
          </Box>
        </Box>
      );
};

export default Signin;
