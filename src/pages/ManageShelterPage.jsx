import NightShelterIcon from "@mui/icons-material/NightShelter";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import AddShelterModal from "../components/AddShelterModal";
import EditShelterModal from "../components/EditShelterModal";
import { getShelterData } from "../hooks/useShelterData";
import { useShelterAdd } from "../hooks/useShelterAdd";
import { useShelterUpdate } from "../hooks/useShelterUpdate";
import { useShelterDelete } from "../hooks/useShelterDelete";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

const ManageShelterPage = () => {
  // Message modal
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Edit shelter modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Add shelter modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const { isPending, isError, data, error } = getShelterData();

  const addShelterMutation = useShelterAdd();
  const updateShelterMutation = useShelterUpdate();
  const deleteShelterMutation = useShelterDelete();

  const queryClient = useQueryClient();

  // Error modal close
  const handleClose = () => {
    setOpen(false);
  };

  // For edit modal
  // Handle Edit submit
  const handleEdiSubmit = (formData) => {
    const name = formData?.name;
    const type = formData?.type;
    const description = formData?.description;
    const contactPerson = formData?.contactPerson;
    const phoneNumber = formData?.phoneNumber;
    const email = formData?.email;
    const address = formData?.address;
    const id = formData?.id;

    updateShelterMutation.mutate(
      {
        id,
        data: {
          name,
          type,
          description,
          contactPerson,
          phoneNumber,
          email,
          address,
        },
      },
      {
        onSuccess: (data) => {
          // On successful updation, show message
          handleEditModalClose();
          setModalMessage("Shelter Updated successfully");
          setOpen(true);
          queryClient.invalidateQueries({ queryKey: ["shelters"] });
        },
        onError: (error) => {
          setModalMessage("Something went wrong. Please try again!");
          setOpen(true);
        },
      }
    );
  };

  // Shelter Edit modal
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // Shelter Edit modal
  const handleEditModalOpen = (shelter) => {
    setSelectedShelter(shelter);
    setEditModalOpen(true);
  };

  // For add modal
  // Handle add submit
  const handleAddSubmit = (formData) => {
    const name = formData?.name;
    const type = formData?.type;
    const description = formData?.description;
    const contactPerson = formData?.contactPerson;
    const phoneNumber = formData?.phoneNumber;
    const email = formData?.email;
    const address = formData?.address;
    const createdBy = localStorage.getItem("admin_id");

    addShelterMutation.mutate(
      {
        name,
        type,
        description,
        contactPerson,
        phoneNumber,
        email,
        address,
        createdBy,
      },
      {
        onSuccess: (data) => {
          // On successful addition, show message
          handleAddModalClose();
          setModalMessage("Shelter Added successfully");
          setOpen(true);
          queryClient.invalidateQueries({ queryKey: ["shelters"] });
        },
        onError: (error) => {
          setModalMessage("Something went wrong. Please try again!");
          setOpen(true);
        },
      }
    );
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  // For delete
  const handleDelete = (shelter) => {
    const id = shelter?.id;

    deleteShelterMutation.mutate(id, {
      onSuccess: (data) => {
        // On successful deletion, show message
        handleAddModalClose();
        setModalMessage("Shelter deleted successfully");
        setOpen(true);
        queryClient.invalidateQueries({ queryKey: ["shelters"] });
      },
      onError: (error) => {
        setModalMessage("Something went wrong. Please try again!");
        setOpen(true);
      },
    });
  };

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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddModalOpen}
        >
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
                  <NightShelterIcon color="primary" sx={{ fontSize: 150 }} />
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
                  <Button
                    size="small"
                    onClick={() => handleEditModalOpen(shelter)}
                  >
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
      <EditShelterModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEdiSubmit}
        shelter={selectedShelter}
      />
      <AddShelterModal
        open={addModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAddSubmit}
      />
    </>
  );
};

export default ManageShelterPage;
