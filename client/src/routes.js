import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import CounsellorDetail from "./components/CounsellorDetail";
import MyOrders from "./components/MyOrders";
import MyBookings from "./components/MyBookings";
import Page404 from "./components/Page404";

export default function Router() {
  return useRoutes([
    {
      path: "/user",
      children: [
        { path: "", element: <Navigate to="/user/profile" replace /> },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      children: [
        { path: "", element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Signup />,
        },
        {
          path: "/myorders",
          element: (
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          ),
        },
        {
          path: "/mybookings",
          element: (
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          ),
        },
        {
          path: "/counsellor/:id",
          element: (
            <PrivateRoute>
              <CounsellorDetail />
            </PrivateRoute>
          ),
        },
      ],
    },
    { path: "*", element: <Page404 /> },
  ]);
}
