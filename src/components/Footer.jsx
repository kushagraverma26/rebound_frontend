import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Kushagra Verma - Fall 2024 Masters Project
      </Typography>
      {/* <Typography variant="subtitle1" align="center" color="text.secondary">
        {new Date().getFullYear()}
      </Typography> */}
    </Box>
  );
};

export default Footer;
