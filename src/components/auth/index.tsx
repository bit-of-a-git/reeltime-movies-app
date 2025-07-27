import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
  Stack,
} from "@mui/material";
import styles from "./styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleButton from "react-google-button";

// For the Auth function, I referred to: https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
// and subsequently https://github.com/ki321g/MovieAPP

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState<string | null>("login");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        setErrorMessage("Error logging in. Please try again");
      });
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        setErrorMessage("Error signing up. Please try again");
        // ..
      });
  };

  const loginWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        setErrorMessage("Error logging in. Please try again");
      });
  };

  const handleActionChange = () => {
    setAction(action === "login" ? "signup" : "login");
    setErrorMessage(null);
  };

  const handleSubmit = async () => {
    action === "login" ? await login() : await signup();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={5} style={styles.paper}>
          <Stack spacing={2}>
            <Typography component="h3" variant="h3" sx={styles.title}>
              {action === "login" ? "Log In" : "Sign Up"}
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <FormControl variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                sx={{ width: "40ch" }}
                required
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="email"
                autoFocus
              />
            </FormControl>
            {/* I referenced https://mui.com/material-ui/react-text-field/ for the hiding password function */}
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                sx={{ width: "40ch" }}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="large"
            >
              {action === "login" ? "Log In" : "Sign Up"}
            </Button>
            <Typography component="h5" variant="h6" align="center">
              {action === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="warning"
              onClick={handleActionChange}
            >
              {action === "login" ? "Sign Up" : "Log In"}
            </Button>
            <GoogleButton
              onClick={loginWithGoogle}
              style={{ marginTop: "1em", width: "100%" }}
            />
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
