import React from "react";
import { CircularProgress, Container, Typography, Box } from "@mui/material";

const LoadingPage = ({ message }) => {
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
        <CircularProgress size={50} style={{ marginBottom: "20px" }} />
        <Typography variant="h6" color="textSecondary">
          {message || "Loading..."}
        </Typography>
      </Box>
    </Container>
  );
};

export default LoadingPage;
