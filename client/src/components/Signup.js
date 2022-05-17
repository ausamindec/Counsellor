import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { signup } from "../actions/user";

const Input = styled("input")({
  display: "none",
});

function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [internalError, setInternalError] = useState("");
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();
  const { error, isLoggedIn } = useSelector((state) => state.user);

  // Getting Location and navigate to handle routing if user is logged in
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setInternalError("");
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmPassword")) {
      setInternalError("Password & Confirm Password does not matches.");
      setIsLoading(false);
      return;
    }

    dispatch(signup(data));
    setIsLoading(false);
  };

  return (
    <Grid container pt={15} justifyContent="center">
      <Grid item md={6} mb={5}>
        <Card elevation={4}>
          <CardHeader title="Register" />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                id="name"
                name="name"
                label="Name"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                required
                id="email"
                name="email"
                type="email"
                label="Email"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="dob"
                name="dob"
                helperText="Date of Birth *"
                // label="Date of Birth"
                type="date"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="qualification"
                name="qualification"
                label="Qualification"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="aboutme"
                name="aboutme"
                label="About Me"
                multiline
                rows={8}
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="phno"
                name="phno"
                label="Phone No"
                type="number"
                fullWidth
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="role">Role *</InputLabel>
                <Select
                  labelId="role"
                  label="role"
                  defaultValue="User"
                  name="role"
                  required
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Counsellor">Counsellor</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
              />

              <TextField
                margin="normal"
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />

              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  name="photo"
                  onChange={(e) => setPic(e.target.files[0].name)}
                />
                <Button variant="contained" component="span">
                  Profile Pic
                </Button>{" "}
                &nbsp;
                {pic}
              </label>

              <br />
              <br />

              <Typography variant="caption" color="error">
                {internalError} &nbsp; {error}
              </Typography>
              <br />
              <Typography variant="caption" color="error">
                * All Fields are required
              </Typography>
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : "Register"}
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{ mb: 2 }}
                fullWidth
                color="error"
                disabled={isLoading}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Signup;
