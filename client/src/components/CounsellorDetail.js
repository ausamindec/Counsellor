import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Typography,
  Stack,
  Rating,
  Avatar,
  Button,
  TextField,
  Box,
  Backdrop,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { toast } from "react-toastify";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrls } from "../utils/apiUrls";

// The Function Loads Razorpay script
function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => resolve(false);
  });
}

function CounsellorDetail(props) {
  const navigate = useNavigate();
  const params = useParams();
  // Loading Page while fetching offer detail
  const [isLoading, setIsLoading] = useState(true);
  // Error If Any
  const [error, setError] = useState();
  const [offer, setOffer] = useState();
  const [counsellingDate, setCounsellingDate] = useState();

  // Fetching offer Details
  useEffect(() => {
    setIsLoading(true);
    // Making API Call here as the data is not required to store in redux
    axios
      .get(apiUrls.offerDetail(params.id))
      .then((response) => {
        setOffer(response.data.offer);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error);
        setIsLoading(false);
      });
  }, []);

  // Function to initiate payment
  async function checkoutRazorpay(paymentInfo) {
    // Loading Razorpay script
    const res = await loadRazorpay();
    if (!res) {
      alert("Failed to load Razorpay");
    }

    // Razorpay options
    const options = {
      key: paymentInfo.key, // Getting from Backend
      amount: paymentInfo.order.amount, // Getting from Backend
      currency: "INR",
      name: "Counsellor",
      description: "Test Transaction",
      order_id: paymentInfo.order.id, // Getting from Backend
      handler: function (response) {
        // On Success Payment Update that in DB
        axios
          .post(apiUrls.confirmPayment(), response)
          .then((response) => {
            toast.success("Payment Successful.");
            navigate("/myorders");
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  // Handling Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Creating Offer
    axios
      .post(apiUrls.offerDetail(params.id), data)
      .then((response) => checkoutRazorpay(response.data))
      .catch((error) => toast.error(error.response.data));
  };

  // Disable Non-Working Days
  const disableDate = (date) => {
    const day = date.toLocaleString("en-us", { weekday: "long" });
    return !offer.workingDays.includes(day);
  };

  return (
    <Grid container my={10}>
      <Grid item md={12} mx={2}>
        {isLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : error ? (
          <Typography variant="h6" color="text.secondary">
            {error}
          </Typography>
        ) : (
          <>
            <Card elevation={4}>
              <CardHeader title={offer.title} />
              <CardContent>
                <Stack>
                  <Avatar
                    alt="P"
                    src={offer.user.photo.secure_url}
                    sx={{ height: 200, width: 200, alignSelf: "center" }}
                  />
                  <Typography variant="h6" textAlign="center" mt={2}>
                    {offer.user.name}
                  </Typography>
                  <Rating
                    readOnly
                    value={offer.ratings}
                    sx={{ alignSelf: "center" }}
                  />
                  <Typography variant="caption" textAlign="center">
                    Rated By - {offer.noOfReviews}
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Experience - {offer.experience} Years
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Expertise In - {offer.expertise}
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Registered License - {offer.license}
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Working Timings - {offer.fromTime} - {offer.toTime}
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Working Days - {offer.workingDays.map((day) => day + ", ")}
                  </Typography>
                  <Typography variant="caption" textAlign="center">
                    Contact On - {offer.user.email} | +91-{offer.user.phno}
                  </Typography>
                  <Typography variant="h6" my={3}>
                    About Counselling Session
                  </Typography>
                  <Typography variant="subtitle1" textAlign="justify">
                    {offer.description}
                  </Typography>
                  <Typography variant="h6" my={3}>
                    About Counsellor
                  </Typography>
                  <Typography variant="subtitle1" textAlign="justify">
                    {offer.user.aboutme}
                  </Typography>
                  <Typography
                    variant="h6"
                    my={3}
                    textAlign="center"
                    color="warning.main"
                  >
                    Fees - Rs. {offer.price}
                  </Typography>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box component="form" onSubmit={handleSubmit}>
                      <DatePicker
                        label="Counselling Date *"
                        shouldDisableDate={disableDate}
                        id="counsellingDate"
                        value={counsellingDate}
                        onChange={(counsellingDate) => {
                          setCounsellingDate(counsellingDate);
                        }}
                        minDate={Date.now()}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            margin="normal"
                            name="counsellingDate"
                            {...params}
                          />
                        )}
                      />

                      <Button fullWidth type="submit" variant="outlined">
                        Book Now
                      </Button>
                    </Box>
                  </LocalizationProvider>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h5">Reviews</Typography>

                {offer.reviews.length === 0 ? (
                  <Typography variant="caption" mt={3}>
                    Not yet Reviewed
                  </Typography>
                ) : (
                  offer.reviews.map((review) => (
                    <Box
                      className="review-box"
                      key={offer.reviews.indexOf(review)}
                    >
                      <Rating size="small" readOnly value={review.rating} />
                      <Typography component="h6" variant="caption">
                        {review.comment}
                      </Typography>
                      <Typography
                        component="h6"
                        variant="caption"
                        textAlign="right"
                      >
                        ~ {review.name}
                      </Typography>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default CounsellorDetail;
