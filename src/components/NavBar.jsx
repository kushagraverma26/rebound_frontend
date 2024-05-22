import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Import AuthContext
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    color: "inherit",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "-8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: ".5em",
  },
  avatarButton: {
    padding: "8px",
    color: "white",
  },
};

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access isAuthenticated and logout from AuthContext
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

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
            style={{ maxWidth: "10rem", minWidth: "10rem" }}
            component={Link}
            to="/resources"
            variant="outlined"
            color="secondary"
            startIcon={<InfoIcon />}
          >
            Resources
          </Button>
          <Button
            style={{ maxWidth: "10rem", minWidth: "10rem" }}
            component={Link}
            to="/shelters"
            variant="text"
            color="secondary"
            startIcon={<HomeIcon />}
          >
            Shelters
          </Button>
          <Button
            style={{ maxWidth: "10rem", minWidth: "10rem" }}
            component={Link}
            to="/chat"
            variant="text"
            color="secondary"
            startIcon={<ChatIcon />}
          >
            Chat
          </Button>
        </div>
        {isAuthenticated ? (
          <>
            <IconButton
              style={styles.avatarButton}
              color="secondary"
              aria-controls="admin-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="admin-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
                Admin Home
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            component={Link}
            to="/login"
          >
            Admin Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
