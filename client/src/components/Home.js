import { Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Counsellors from "./Counsellors";
import Footer from "./Footer";

const useStyles = makeStyles({
  backImg: {
    height: "70vh",
    width: "100vw",
    backgroundImage: "url('/background.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  introText: {
    color: "white",
    margin: "25vh 10vw",
  },
});

function Home(props) {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column">
        <Grid item className={classes.backImg}>
          <Box className={classes.introText}>
            <Typography variant="h4">Counsellor</Typography>
            <br />
            <Typography variant="h6">
              A Demo Website Where Users can schedule call with Verified
              Counsellors and get carrer advice.
            </Typography>
          </Box>
        </Grid>
        <Grid item mx={5} my={2}>
          <Typography variant="h4">Our Counsellors</Typography>
        </Grid>
        <Grid item mx={5}>
          <Counsellors />
        </Grid>

      </Grid>
      <Footer />
    </>
  );
}

export default Home;
