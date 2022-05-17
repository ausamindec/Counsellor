import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiUrls } from "../utils/apiUrls";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Single Booking Card
function OneBooking({ booking, handleStatusChange }) {
  const [counsellingStatus, setCounsellingStatus] = useState(
    booking.counsellingStatus
  );

//   On Submit Status Change
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(apiUrls.updateCounsellingStatus(), {
        counsellingStatus,
        orderId: booking._id,
      })
      .then((response) => {
        toast.success("Status Successfully Updated.");
        handleStatusChange(booking._id, counsellingStatus);
      })
      .catch((error) => toast.error(error.response.data.error));
  };
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Stack>
            <Typography variant="h6">{booking.user.name}</Typography>
            <Stack direction="row" justifyContent="space-between" spacing={3}>
              <Typography variant="subtitle2" textAlign="justify">
                {booking.user.aboutme}
              </Typography>
              <Avatar
                alt="P"
                src={booking.user.photo.secure_url}
                sx={{ height: 50, width: 50 }}
              />
            </Stack>
            <Typography variant="h6" textAlign="justify">
              User Details:
            </Typography>
            <Typography variant="subtitle2" textAlign="justify">
              Email: {booking.user.email}
            </Typography>
            <Typography variant="subtitle2" textAlign="justify">
              Phone No.: {booking.user.phno}
            </Typography>
            <Typography variant="subtitle2" textAlign="justify">
              Dob: {booking.user.dob.split("T")[0]}
            </Typography>
            <Typography variant="subtitle2" textAlign="justify">
              Qualification: {booking.user.qualification}
            </Typography>

            <Typography variant="h6" textAlign="justify">
              Session Details:
            </Typography>
            <Typography variant="subtitle2" textAlign="justify">
              Counselling Date: {booking.counsellingDate.split("T")[0]}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container>
                <Grid item md={3}>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel id="counsellingStatus">
                      Counselling Status
                    </InputLabel>
                    <Select
                      labelId="counsellingStatus"
                      label="Counselling Status"
                      name="counsellingStatus"
                      value={counsellingStatus}
                      onChange={(e) => setCounsellingStatus(e.target.value)}
                      sx={{ maxWidth: "250px" }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={1} alignSelf="center">
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Typography variant="subtitle2" textAlign="justify">
              Price: Rs. {booking.price}
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Chip
                label={`Payment: ${booking.paymentInfo.status}`}
                color={
                  booking.paymentInfo.status === "Paid" ? "success" : "error"
                }
                variant="filled"
                size="small"
              />
              <Chip
                label={`Session: ${booking.counsellingStatus}`}
                color={
                  booking.counsellingStatus === "Pending"
                    ? "error"
                    : booking.counsellingStatus === "Completed"
                    ? "success"
                    : "warning"
                }
                variant="filled"
                size="small"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

// Collection of Booking Cards
function MyBookings(props) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state.user);
  
  
  useEffect(() => {
    setIsLoading(true);
    if (userDetail.role === "User") {
        // If not counsellor navigate to page404
      navigate("/Page404");
    }
    axios
      .get(apiUrls.getMyBookings())
      .then((response) => {
        setBookings(response.data.bookings);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

//   On Status change update state of component
  const handleStatusChange = (id, status) => {
    const tempBookings = [...bookings];
    tempBookings.map((booking) => {
      if (booking._id === id) {
        booking.counsellingStatus = status;
      }
    });
    setBookings(tempBookings);
  };
  return (
    <Grid container pt={15} px={3} direction="column" spacing={2} mb={10}>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <Typography variant="h4">My Bookings</Typography>
          {bookings.length === 0 ? (
            <Typography variant="subtitle2" color="text.secondary">
              No Data Found
            </Typography>
          ) : (
            bookings.map(
              (booking) =>
                booking.paymentInfo.status === "Paid" && (
                  <OneBooking
                    booking={booking}
                    key={booking._id}
                    handleStatusChange={handleStatusChange}
                  />
                )
            )
          )}
        </>
      )}
    </Grid>
  );
}

export default MyBookings;
