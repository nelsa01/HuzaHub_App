import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

//import { theme } from './theme';
import { ProSidebarProvider } from "react-pro-sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import SingleJob from "./pages/SingleJob";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashCategory from "./pages/admin/DashCategory";
import DashCreateCategory from "./pages/admin/DashCreateCategory";
import DashCreateJob from "./pages/admin/DashCreateJob";
import DashJobs from "./pages/admin/DashJobs";
import DashUsers from "./pages/admin/DashUsers";
import Layout from "./pages/global/Layout";
import UserDashboard from "./pages/user/UserDashboard";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import UserJobsHistory from "./pages/user/UserJobsHistory";
// import Signup from "./pages/Signup";
import { createTheme } from "@mui/material/styles";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Footer from "./component/Footer";
import Services from "./component/Services";
import BookingPage from "./pages/BookingPage";
import ConfirmTask from "./pages/Confirm";
import History from "./pages/History";
import HomeTasker from "./pages/HomeTasker";
import LandingPage from "./pages/Landingpage";
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";
import Signin from "./pages/Signin";
import ServiceProvider from "./pages/Signup";
import SplashScreen from "./pages/SplashScreen";
import { themeColors } from "./theme";
import BookingDetails from "./component/BookingDetails";
// import Availability from "./component/Calendar";
import FetchBookings from "./pages/FetchBooking"

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashCreateCategoryHOC = Layout(DashCreateCategory);

const App = () => {
  const { mode } = useSelector((state) => state.mode);
  const { userInfo } = useSelector((state) => state.signIn);
  const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/splash" element={<SplashScreen />} />
              <Route path="/search/location/:location" element={<Home />} />
              <Route path="/search/:keyword" element={<Home />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/confirm" element={<ConfirmTask />} />
              <Route path="/serviceProvider" element={<ServiceProvider />} />
              <Route path="/services" element={<Services />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/signup" element={<ServiceProvider />} />
              <Route path="/signin" element={<Signin />} />
              {/* <Route path="/calendar" element={<Availability />} /> */}
              <Route path="/hometasker" element={<HomeTasker />} />
              <Route path="/bookingdetails" element={<BookingDetails />} />
              <Route path="/fetchbooking" element={<FetchBookings />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment" element={<Payment />}/>
              <Route path="/history" element={<History />} />
              <Route path="/job/:id" element={<SingleJob />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/admindashboard/:serviceProviderId" element={<AdminDashboard />} />
              <Route
                path="/home"
                element={
                  userInfo ? (
                    userInfo.role === "client" ? (
                      <Home />
                    ) : (
                      <HomeTasker />
                    )
                  ) : (
                    <LandingPage />
                  )
                }
              />

              {/* <Route path="/home" element={
                <Home />
               } /> */}
              {/* <Route path="/home" element={
                userInfo?.role === "client" ?
                <Home />
                userInfo?.role === "" ?
                :
                <HomeTasker />
              } /> */}

              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/booking/:serviceProviderId" element={<BookingPage/>} />
              {/* <Route path="/fetchbooking/:serviceProviderId" element={<FetchBookings/>} /> */}
                             {/* <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <DashUsersHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <DashJobsHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/category"
                element={
                  <AdminRoute>
                    <DashCategoryHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/job/create"
                element={
                  <AdminRoute>
                    <DashCreateJobHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/category/create"
                element={
                  <AdminRoute>
                    <DashCreateCategoryHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/user/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/jobs"
                element={
                  <UserRoute>
                    <UserJobsHistoryHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/user/info"
                element={
                  <UserRoute>
                    <UserInfoDashboardHOC />
                  </UserRoute>
                }
              /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
