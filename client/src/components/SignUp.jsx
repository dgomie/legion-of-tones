import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, duration, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        FITSYNC-PRO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Signup = () => {
  const [addUser] = useMutation(ADD_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [dobError, setDobError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleDateOfBirthChange = (event) => {
    const dateOfBirth = event.target.value;
    const age = calculateAge(new Date(dateOfBirth));

    if (age < 13 || age > 150) {
      setDobError(
        "You must be at least 13 years old and less than 150 years old to sign up."
      );
      setIsButtonDisabled(true);
    } else {
      setDobError("");
      setIsButtonDisabled(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username: event.target.username.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      dateOfBirth: event.target.dateOfBirth.value,
      activityLevel: event.target.activityLevel.value,
      durationGoal: parseInt(event.target.durationGoal.value, 10),
      workoutGoal: parseInt(event.target.workoutGoal.value, 10)
    };

    try {
      const { data } = await addUser({ variables: { userData } });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);

    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "25px" }}>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            backgroundColor: "#b4c4ab",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#46563c" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(dobError)}
                    helperText={dobError}
                    onChange={handleDateOfBirthChange}
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: { backgroundColor: "white" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ backgroundColor: "white" }}>
                    <InputLabel id="activity-level-label">
                      Exercise Experience
                    </InputLabel>
                    <Select
                      labelId="activity-level-label"
                      id="activityLevel"
                      name="activityLevel"
                      defaultValue=""
                    >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ backgroundColor: "white" }}>
                    <TextField
                      id="workoutGoal"
                      label="Monthly Workouts Goal"
                      type="number"
                      variant="outlined"
                      inputProps={{ min: "0" }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ backgroundColor: "white" }}>
                    <TextField
                      id="durationGoal"
                      label="Monthly Active Minutes Goal"
                      type="number"
                      variant="outlined"
                      inputProps={{ min: "0" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#46563c",
                  "&:hover": {
                    backgroundColor: "#869f76",
                  },
                }}
                disabled={isButtonDisabled}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
