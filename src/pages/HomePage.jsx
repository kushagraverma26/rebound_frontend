import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const HomePage = () => {
  const featuredContent = [
    {
      title: "Exploring Resources",
      description:
        "Discover a wealth of resources to support your journey toward stability.",
    },
    {
      title: "Get Help in Your Own Language",
      description:
        "Chat in the language you are most comfortable in. Connect with social workers and get immidiate assistance.",
    },
    {
      title: "Stories of Resilience",
      description:
        "Read inspiring stories of students who overcame challenges and found success.",
    },
  ];

  return (
    <Box height="80vh" display="flex" flexDirection="column" padding={2}>
      <Container maxWidth={false} style={{ height: "80vh" }}>
        <Grid container spacing={3} style={{ height: "80vh" }}>
          {/* Left Half */}
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                height: "100%",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
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
              style={{
                height: "100%",
                padding: "20px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h4" gutterBottom alignSelf="top">
                Featured
              </Typography>
              <Grid container spacing={2}>
                {featuredContent.map((item, index) => (
                  <Grid item key={index} xs={12} component={Link} to="/" style={{textDecoration: "none"}}>
                    <Card elevation={3} style={{ borderRadius: "20px" }}>
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
              <Box></Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
