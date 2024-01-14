import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ChatPage = () => {
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
        <Typography variant="h5" color="primary" gutterBottom>
          Chat Coming Soon!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          We're working on some awesome features to enhance your experience.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ChatPage;
