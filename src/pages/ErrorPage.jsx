import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = ({ error }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        textAlign: "center",
        marginTop: "100px",
        height: "65vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h5" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          {error || "An unexpected error occurred."}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
