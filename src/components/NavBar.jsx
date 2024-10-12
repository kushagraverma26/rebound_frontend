import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // Import AuthContext
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery hook
import { useTheme } from "@mui/material/styles";

const styles = {
  appBar: {
    borderRadius: "5em",
    margin: "auto",
    height: "7.5vh",
    top: "5px",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  centerButtonsContainer: {
    flexGrow: 1, // Makes sure the buttons container takes available space
    display: "flex",
    justifyContent: "center", // Center the buttons
    gap: "1rem", // Space between buttons
  },
  transparentDrawer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency
  },
};

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Access isAuthenticated and logout from AuthContext
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme(); // Get the theme to check the breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small
  const isMedium = useMediaQuery(theme.breakpoints.down("md")); // Check if the screen is medium

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={styles.transparentDrawer} // Apply transparency to Drawer
    >
      <List>
        <ListItem button component={Link} to="/resources">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={Link} to="/shelters">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Shelters" />
        </ListItem>
        <ListItem button component={Link} to="/chat">
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        {isAuthenticated ? (
          <>
            <Divider />
            <ListItem button component={Link} to="/admin">
              <ListItemText primary="Admin Home" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Admin Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" style={styles.appBar}>
      <Toolbar style={styles.navBar}>
        {/* Rebound Logo */}
        <Box style={styles.titleContainer} component={Link} to="/">
          <Typography variant="h6" style={styles.title}>
            Rebound
          </Typography>
          <Typography variant="subtitle1" style={styles.subtitle}>
            Support . Achieve . Succeed
          </Typography>
        </Box>

        {/* Centered Buttons */}
        {!isMobile && !isMedium && (
          <Box style={styles.centerButtonsContainer}>
            {" "}
            {/* Center buttons */}
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
          </Box>
        )}

        {/* Admin buttons or Menu on mobile/medium screens */}
        {isMobile || isMedium ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : isAuthenticated ? (
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
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
