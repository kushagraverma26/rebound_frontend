import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { getResourceData } from "../hooks/useResourceData";
import { extractVideoID } from "../utils/helpers";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const ResourcesPage = () => {
  const { isPending, isError, data, error } = getResourceData();

  if (isPending) {
    // Handle loading state
    return <LoadingPage message="Please Wait..." />;
  }

  if (isError) {
    // Handle error state
    return <ErrorPage />;
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Available Resources
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Find information about latest aids, programs, as well as
            instructional videos to help you understand the rehabilitation
            process.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {data.map((resource) => (
            <Grid item key={resource.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {resource.type === "video" ? (
                  <CardMedia
                    component="iframe"
                    src={`https://www.youtube.com/embed/${extractVideoID(
                      resource.video_url
                    )}`}
                    title={resource.name}
                    allowFullScreen
                  />
                ) : (
                  <CardMedia
                    component="div"
                    sx={{
                      pt: "56.25%",
                      backgroundImage:
                        "url(https://source.unsplash.com/random?wallpapers)",
                      backgroundSize: "cover",
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {resource.name}
                  </Typography>
                  <Typography>{resource.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/resources/${resource.id}`}
                    key={resource.id}
                    size="small"
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ResourcesPage;
