import React, { useState } from "react";
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

import EditResourceModal from "../components/EditResourceModal";
import AddResourceModal from '../components/AddResourceModal';

const cards = [
  {
    type: "video",
    videoId: "/klvm6dpuS_A?si=j6TFO-Zux2zz4MLP",
    heading: "Roommate Agreements",
    description: "How roommate agreements work",
  },
  {
    type: "video",
    videoId: "/bimXxKVI_XM?si=RPYNP6FtwJG8BWlk",
    heading: "California Rental and Lease Agreement",
    description: "How Rental and Lease Agreements work",
  },
  {
    type: "video",
    videoId: "/0bIutq_uMjo?si=GSBVPYnbsg4jgjQh",
    heading: "Rental Laws and Eviction Rules",
    description: "How Rental Laws and Eviction Rules work",
  },
  {
    type: "normal",
    heading: "California Unemployment Insurance",
    description: "California Unemployment Insurance",
  },
  {
    type: "normal",
    heading: "California CalWORKs (TANF)",
    description: "California CalWORKs (TANF)",
  },
  {
    type: "normal",
    heading: "Specified Low-Income Medicare Beneficiary (SLMB) Program",
    description: "Specified Low-Income Medicare Beneficiary (SLMB) Program",
  },
];

const ManageResourcePage = () => {

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false); // State for controlling add resource modal visibility
    const [selectedResource, setSelectedResource] = useState(null);
    
    const handleEdit = (resource) => {
        setSelectedResource(resource);
        setEditModalOpen(true);
    };
    
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleAddResource = () => {
        setAddModalOpen(true);
      };
    
      const handleCloseAddModal = () => {
        setAddModalOpen(false);
      };
    
    const handleSubmit = (formData) => {
        // Send PUT request to API with formData
        console.log("Submitting form data:", formData);
    };
 
  const handleDelete = (resource) => {
    console.log("Delete resource:", resource);
  };

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
            Manage Resources
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
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddResource}>
          Add Resource
        </Button>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {card.type === "video" ? (
                  <CardMedia
                    component="iframe"
                    src={`https://www.youtube.com/embed/${card.videoId}`}
                    title={card.heading}
                    allowFullScreen
                    sx={
                      {
                        // pt: "56.25%",
                      }
                    }
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
                    {card.heading}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small" onClick={() => handleEdit(card)}>Edit</Button>
                  <Button size="small" onClick={() => handleDelete(card)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <AddResourceModal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleSubmit} />
      <EditResourceModal
        resource={selectedResource}
        open={editModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageResourcePage;
