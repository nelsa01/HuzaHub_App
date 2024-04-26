import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { userSignUpAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  repeatPassword: yup
    .string("Repeat your password")
    .required("Please confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
      // rememberMe: false,
      role: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      // dispatch(userSignUpAction(values));
      dispatch(userSignUpAction({...values, role:"client"}));
      actions.resetForm();
      navigate("/home");
    },
  });

  // const jobFormik = useFormik({
  //   initialValues: {
  //     username: "",
  //     password: "",
  //     repeatPassword: "",
  //     rememberMe: false,
  //     tasker: false,
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values, actions) => {
  //     dispatch(userSignUpAction(values));
  //     actions.resetForm();
  //     navigate("/login");
  //   },
  // });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
      }}>
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: 3,
          width: "100%",
          maxWidth: "340px",
          bgcolor: "background.paper",
        }}
        component="form"
        onSubmit={formik.handleSubmit}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up as a Client
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
        <TextField
          margin="normal"
          fullWidth
          id="repeatPassword"
          name="repeatPassword"
          label="Repeat password"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
        />
        
        {/* <FormControlLabel
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
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Sign up
        </Button>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}></Box>
        <Typography variant="body2">
          Already a member?{" "}
          <Button href="/login" color="primary">
            Sign in
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
