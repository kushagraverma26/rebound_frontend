import { useContext, useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import LoadingPage from "./LoadingPage";

import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const signupMutation = useSignup();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const phoneNumber = formData.get("phone_number");
    const licenseNumber = formData.get("license_number");
    const licenseType = formData.get("license_type");
    const isActive = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !licenseNumber ||
      !licenseType
    ) {
      setModalMessage("Please fill out all required fields.");
      setOpen(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setOpen(true);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setModalMessage("Phone number must be exactly 10 digits.");
      setOpen(true);
      return;
    }

    signupMutation.mutate(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        licenseNumber,
        licenseType,
        isActive,
        password,
      },
      {
        onSuccess: (data) => {
          // On successful signup, login the user
          login(data);
          navigate("/admin");
        },
        onError: (error) => {
          setModalMessage("Something went wrong. Please try again!");
          setOpen(true);
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (signupMutation.isPending) return <LoadingPage message="Please Wait..." />;

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ height: "90vh" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="license_number"
                  label="License Number"
                  name="license_number"
                  autoComplete="license-number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  id="license_type"
                  label="License Type"
                  name="license_type"
                  autoComplete="license-type"
                >
                  <MenuItem value="Associate Clinical Social Worker (ASW)">
                    Associate Clinical Social Worker (ASW)
                  </MenuItem>
                  <MenuItem value="Licensed Clinical Social Worker (LCSW)">
                    Licensed Clinical Social Worker (LCSW)
                  </MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default SignUp;
