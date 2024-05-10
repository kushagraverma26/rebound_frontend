import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import DashboardIcon from '@mui/icons-material/Dashboard';

const AdminHomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Make the page take full screen height without scrolling
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Hello Admin
        </Typography>
      </Container>
      <Container sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={4}
          justifyContent="center" // Center the grid items horizontally
          alignItems="center" // Center the grid items vertically
        >
          {/* Card 1: Manage Shelters */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/admin/shelters" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "280px", // Adjusted height for the card
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <HomeIcon sx={{ fontSize: 60 }} color="primary" />
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Shelters
                  </Typography>
                  <Typography>
                    Click here to manage shelters.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Card 2: Manage Resources */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/admin/resources" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "280px", // Adjusted height for the card
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <BusinessIcon sx={{ fontSize: 60 }} color="primary" />
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Resources
                  </Typography>
                  <Typography>
                    Click here to manage resources.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Card 3: Dashboard */}
          <Grid item xs={12} sm={6} md={4}>
            <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "280px", // Adjusted height for the card
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <DashboardIcon sx={{ fontSize: 60 }} color="primary" />
                  <Typography gutterBottom variant="h5" component="h2">
                    Dashboard
                  </Typography>
                  <Typography>
                    Click here to view the dashboard.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminHomePage;
