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
  Modal,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getResourceData } from "../hooks/useResourceData";
import { useResourceAdd } from "../hooks/useResourceAdd";
import { useResourceUpdate } from "../hooks/useResourceUpdate";
import { useResourceDelete } from "../hooks/useResourceDelete";
import { extractVideoID } from "../utils/helpers";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

import EditResourceModal from "../components/EditResourceModal";
import AddResourceModal from "../components/AddResourceModal";

const ManageResourcePage = () => {
  // Message modal
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Edit resource modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  // Add resource modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const { isPending, isError, data, error } = getResourceData();

  const addResourceMutation = useResourceAdd();
  const updateResourceMutation = useResourceUpdate();
  const deleteResourceMutation = useResourceDelete();

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
    const details = formData?.details;
    const videoUrl = formData?.videoUrl;
    const id = formData?.id;

    updateResourceMutation.mutate(
      {
        id,
        data: {
          name,
          type,
          description,
          details,
          videoUrl,
        },
      },
      {
        onSuccess: (data) => {
          // On successful updation, show message
          handleEditModalClose();
          setModalMessage("Resource Updated successfully");
          setOpen(true);
          queryClient.invalidateQueries({ queryKey: ["resources"] });
        },
        onError: (error) => {
          setModalMessage("Something went wrong. Please try again!");
          setOpen(true);
        },
      }
    );
  };

  // Resource Edit modal
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // Resource Edit modal
  const handleEditModalOpen = (resource) => {
    setSelectedResource(resource);
    setEditModalOpen(true);
  };

  // For add modal
  // Handle add submit
  const handleAddSubmit = (formData) => {
    const name = formData?.name;
    const type = formData?.type;
    const description = formData?.description;
    const details = formData?.details;
    const videoUrl = formData?.videoUrl;
    const createdBy = localStorage.getItem("admin_id");

    addResourceMutation.mutate(
      {
        name,
        type,
        description,
        details,
        videoUrl,
        createdBy,
      },
      {
        onSuccess: (data) => {
          // On successful addition, show message
          handleAddModalClose();
          setModalMessage("Resource Added successfully");
          setOpen(true);
          queryClient.invalidateQueries({ queryKey: ["resources"] });
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
  const handleDelete = (resource) => {
    console.log(resource);
    const id = resource?.id;

    deleteResourceMutation.mutate(id, {
      onSuccess: (data) => {
        // On successful deletion, show message
        handleAddModalClose();
        setModalMessage("Resource deleted successfully");
        setOpen(true);
        queryClient.invalidateQueries({ queryKey: ["resources"] });
      },
      onError: (error) => {
        setModalMessage("Something went wrong. Please try again!");
        setOpen(true);
      },
    });
  };

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
            Manage Resources
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Manage resources by adding, updating, and deleting information.
          </Typography>
        </Container>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddModalOpen}
        >
          Add Resource
        </Button>
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
                {resource.type === "video" && (
                  <CardMedia
                    component="iframe"
                    src={`https://www.youtube.com/embed/${extractVideoID(
                      resource.video_url
                    )}`}
                    title={resource.name}
                    allowFullScreen
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
                  <Button
                    size="small"
                    onClick={() => handleEditModalOpen(resource)}
                  >
                    Edit
                  </Button>
                  <Button size="small" onClick={() => handleDelete(resource)}>
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
      <AddResourceModal
        open={addModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAddSubmit}
      />
      <EditResourceModal
        resource={selectedResource}
        open={editModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleEdiSubmit}
      />
    </>
  );
};

export default ManageResourcePage;
