import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditShelterModal from "../components/EditShelterModal";
import AddShelterModal from "../components/AddSHelterModal";
import { getShelterData } from "../hooks/useShelterData";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import RoofingIcon from "@mui/icons-material/Roofing";

const ManageShelterPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const { data, loading, error } = getShelterData();

  const handleEdit = (shelter) => {
    setSelectedShelter(shelter);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleAddShelter = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  // Function to handle submit (for edit and add modals)
  const handleSubmit = (formData) => {
    // Implement API call to save shelter details
    console.log("Submitting form data:", formData);
  };

  // Function to handle delete
  const handleDelete = (shelter) => {
    // Implement API call to delete shelter
    console.log("Delete shelter:", shelter);
  };

  if (loading) {
    return <LoadingPage message="Please Wait..." />;
  }

  if (error) {
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
            Manage Shelters
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddShelter}>
          Add Shelter
        </Button>
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
                  <Button size="small" onClick={() => handleEdit(shelter)}>
                    Edit
                  </Button>
                  <Button size="small" onClick={() => handleDelete(shelter)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Pass appropriate props to EditShelterModal and AddShelterModal */}
      <EditShelterModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmit}
        shelter={selectedShelter}
      />
      <AddShelterModal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageShelterPage;
