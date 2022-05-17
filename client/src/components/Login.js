import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Imports
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../actions/user";
import { useState } from "react";

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

  // Getting Redux dispatch amd user state from store
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

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    await dispatch(login(data));
    setIsLoading(false);
  };

  return (
    <Grid container pt={15} justifyContent="center">
      <Grid item md={6}>
        <Card elevation={4}>
          <CardHeader title="Login" />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                id="email"
                name="email"
                label="Email"
                autoFocus
                fullWidth
              />
              <TextField
                margin="normal"
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                fullWidth
              />

              {error && (
                <Typography variant="caption" color="error">
                  * {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress /> : "Login"}
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/register"
                sx={{ mb: 2 }}
                fullWidth
                color="error"
                disabled={isLoading}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Login;
