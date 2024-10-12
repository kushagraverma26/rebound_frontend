import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const HomePage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const featuredContent = [
    {
      title: "Exploring Resources",
      description:
        "Discover a wealth of resources to support your journey toward stability.",
    },
    {
      title: "Get Help in Your Own Language",
      description:
        "Chat in the language you are most comfortable in. Connect with social workers and get immediate assistance.",
    },
    {
      title: "Stories of Resilience",
      description:
        "Read inspiring stories of students who overcame challenges and found success.",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={2}
      sx={{ height: "auto", minHeight: "75vh" }}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* Left Half */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                height: "100%",
                padding: 4,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom>
                Welcome to Rebound
              </Typography>
              <Typography variant="body1">
                Navigating through challenges shouldn't be a solitary journey.
                At Rebound, we're here to extend a helping hand to unhoused
                students, providing a one-stop assistance portal to guide you
                towards support, resources, and a brighter future.
              </Typography>
            </Paper>
          </Grid>

          {/* Right Half */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                height: "100%",
                padding: 4,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant={isSmallScreen ? "h5" : "h4"}
                gutterBottom
                alignSelf="top"
              >
                Featured
              </Typography>
              <Grid container spacing={2}>
                {featuredContent.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    component={Link}
                    to="/"
                    sx={{ textDecoration: "none" }}
                  >
                    <Card elevation={3} sx={{ borderRadius: "20px" }}>
                      <CardHeader title={item.title} />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
