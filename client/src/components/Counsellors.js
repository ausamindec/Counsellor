import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Single Card
function CounsellorCard({ offer }) {
  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: "100%" }} elevation={4}>
        <CardContent>
          <Stack>
            <Avatar
              alt="P"
              src={offer.user.photo.secure_url}
              sx={{ height: 200, width: 160, alignSelf: "center" }}
            />
            <Typography
              variant="h6"
              color="info.dark"
              mt={1}
              alignSelf="center"
            >
              {offer.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              alignSelf="center"
            >
              - {offer.user.name}
            </Typography>
            <Rating
              readOnly
              value={offer.ratings}
              size="small"
              sx={{ alignSelf: "center" }}
            />
            <Typography
              textAlign="justify"
              color="text.secondary"
              variant="caption"
              className="text-wrap"
              mt={2}
            >
              {offer.description}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/counsellor/${offer._id}`}>
            View Detalis
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

// Collection of Counsellor Cards
function Counsellors(props) {
  const { success, offers } = useSelector((state) => state.offer);

  return (
    <Grid container alignItems="stretch" spacing={3} mb={8}>
      {success &&
        offers.map((offer) => <CounsellorCard key={offer._id} offer={offer} />)}
    </Grid>
  );
}

export default Counsellors;
