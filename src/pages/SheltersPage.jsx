import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Container,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import RoofingIcon from "@mui/icons-material/Roofing";
import { getShelterData } from "../hooks/useShelterData";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const SheltersPage = () => {
  const { isPending, isError, data, error } = getShelterData();

  if (isPending) return <LoadingPage message="Please Wait..." />;

  if (isError) return <ErrorPage />;

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
            Housing Resources
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Find information about available shelters in your area.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {data.map((shelter) => (
            <Grid item key={shelter.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  sx={{
                    width: "100%",
                    backgroundSize: "cover",
                  }}
                >
                  <RoofingIcon color="primary" sx={{ fontSize: 150 }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h5"
                    textAlign="center"
                  >
                    {shelter.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shelter.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/shelters/${shelter.id}`}
                    key={shelter.id}
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

export default SheltersPage;
