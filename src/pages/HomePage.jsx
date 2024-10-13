import React, { useState, useEffect } from "react";
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

  // States to trigger slide animation
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setLoaded(true);
  }, []);

  const featuredContent = [
    {
      title: "Exploring Resources",
      description:
        "Discover a wealth of resources to support your journey toward stability.",
      link: "/resources", // Link to Resources page
    },
    {
      title: "Finding Shelters",
      description:
        "Locate safe and reliable shelters near you, offering temporary or long-term housing solutions.",
      link: "/shelters", // Link to Shelters page
    },
    {
      title: "Get Help in Your Own Language",
      description:
        "Chat in the language you are most comfortable in. Connect with social workers and get immediate assistance.",
      link: "/chat", // Link to Chat page
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={2}
      sx={{ height: "auto", minHeight: "90vh" }}
    >
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* Left Half - Welcome Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              opacity: loaded ? 1 : 0, // Fade in effect
              transform: loaded ? "translateY(0)" : "translateY(100px)", // Slide up effect
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out", // Transition properties
            }}
          >
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

          {/* Right Half - Featured Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              opacity: loaded ? 1 : 0, // Fade in effect
              transform: loaded ? "translateY(0)" : "translateY(100px)", // Slide up effect
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out", // Transition properties
            }}
          >
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
                    to={item.link} // Make each card clickable and redirect to the appropriate page
                    sx={{ textDecoration: "none" }}
                  >
                    <Card
                      elevation={3}
                      sx={{
                        borderRadius: "20px",
                        transition: "transform 0.3s ease-in-out", // Smooth transition
                        "&:hover": {
                          transform: "scale(1.05)", // Pop out effect
                        },
                      }}
                    >
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
