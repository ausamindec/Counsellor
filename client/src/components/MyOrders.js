import {
  Card,
  Grid,
  Typography,
  CardContent,
  Button,
  Rating,
  TextField,
  Chip,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { apiUrls } from "../utils/apiUrls";

// One Order Card
function OneOrder({ order }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

//   Handling Add Review
  const handleAddReview = (e, id) => {
    e.preventDefault();
    setIsSubmit(!isSubmit);
    axios.post(apiUrls.addReview(), { comment, rating, orderId: id });
  };

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography variant="h6">{order.offer.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            By- {order.offer.user.name}
          </Typography>

          <Typography textAlign="justify" mt={3}>
            {order.offer.description}
          </Typography>
          <Typography variant="h6" mt={3} textAlign="right">
            Counselling Date: {order.counsellingDate.split("T")[0]}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Chip
              label={`Payment: ${order.paymentInfo.status}`}
              color={order.paymentInfo.status === "Paid" ? "success" : "error"}
              variant="filled"
              size="small"
            />
            <Chip
              label={`Session: ${order.counsellingStatus}`}
              color={
                order.counsellingStatus === "Pending"
                  ? "error"
                  : order.counsellingStatus === "Completed"
                  ? "success"
                  : "warning"
              }
              variant="filled"
              size="small"
            />
          </Stack>

          {order.review ? (
            <>
              <Typography component="h5" variant="h5">
                Review
              </Typography>
              <Rating name="rating" value={order.review.rating} readOnly />
              <TextField
                fullWidth
                value={order.review.comment}
                disabled={true}
                label="Comment"
                margin="normal"
              />
            </>
          ) : (
            <>
              <Typography component="h5" variant="h5">
                Review
              </Typography>
              <Rating
                name="rating"
                value={rating}
                readOnly={isSubmit}
                onChange={(event, newRating) => setRating(newRating)}
              />
              <TextField
                fullWidth
                margin="normal"
                value={comment}
                disabled={isSubmit}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Comment..."
              />
              <Button
                disabled={rating === 0 || comment === "" || isSubmit}
                onClick={(e) => handleAddReview(e, order._id)}
              >
                Submit
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

function MyOrders(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(apiUrls.getMyOrders())
      .then((response) => {
        setOrders(response.data.orders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoading(false);
      });
  }, []);

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
          <Typography variant="h4">My Sessions</Typography>
          {orders.length === 0 ? (
            <Typography variant="subtitle2" color="text.secondary">
              No Data Found
            </Typography>
          ) : (
            orders.map((order) => <OneOrder order={order} key={order._id} />)
          )}
        </>
      )}
    </Grid>
  );
}

export default MyOrders;
