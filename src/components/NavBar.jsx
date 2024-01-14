import React from "react";
import { Link } from 'react-router-dom';

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from '@mui/icons-material/Chat';

const styles = {
  appBar: {
    borderRadius: "5em",
    margin: "auto",
    height: "7.5vh",
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    textDecoration: "none",
    color: "inherit"
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "-8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: ".5em",
  },
};

const Navbar = () => {
  return (
    <AppBar position="sticky" style={styles.appBar}>
      <Toolbar style={styles.navBar}>
        <Box style={styles.titleContainer} component={Link} to="/">
          <Typography variant="h6" style={styles.title}>
            Rebound
          </Typography>
          <Typography variant="subtitle1" style={styles.subtitle}>
            Support . Achieve . Succeed
          </Typography>
        </Box>
        <div style={styles.navButtons}>
          <Button
            style={{maxWidth: '10rem', minWidth: '10rem'}}
            component={Link} to="/resources"
            variant="outlined"
            color="secondary"
            startIcon={<InfoIcon />}
          >
            Resources
          </Button>
          <Button
            style={{maxWidth: '10rem', minWidth: '10rem'}}
            component={Link} to="/shelters"
            variant="text"
            color="secondary"
            startIcon={<HomeIcon />}
          >
            Shelters
          </Button>
          <Button
            style={{maxWidth: '10rem', minWidth: '10rem'}}
            component={Link} to="/chat"
            variant="text"
            color="secondary"
            startIcon={<ChatIcon />}
          >
            Chat
          </Button>
        </div>
        <Button color="secondary" size="small" variant="outlined" component={Link} to="/login">
          Admin Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
