import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import LoadingPage from "./LoadingPage";
import { useMutation } from "@tanstack/react-query";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setValidationError("Both email and password fields are required.");
      setOpen(true);
      return;
    }

    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          setModalMessage("Login successful!");
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/admin");
          }, 1000);
        },
        onError: () => {
          setModalMessage("Login unsuccessful!");
          setOpen(true);
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    setValidationError("");
  };

  if (login.isPending) return <LoadingPage message="Please Wait..." />;

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ height: "70vh" }}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
            {validationError || modalMessage}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Login;
