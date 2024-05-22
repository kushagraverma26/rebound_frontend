import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Box,
  Button,
  Modal,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getShelterDetails } from "../hooks/useShelterDetails";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import ShelterApplyModal from "../components/ShelterApplyModal";
import { useShelterApply } from "../hooks/useShelterApply";

const ShelterDetailsPage = () => {
  const { id } = useParams();
  const { isPending, isError, data, error } = getShelterDetails(id);
  // Message modal
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // Shelter apply modal
  const [openModal, setOpenModal] = useState(false);

  const shelterApplyMutation = useShelterApply();

  const handleSubmit = (formData) => {
    const firstName = formData?.firstName;
    const lastName = formData?.lastName;
    const email = formData?.email;
    const phoneNumber = formData?.phoneNumber;
    const gender = formData?.gender;
    const notes = formData?.notes;
    const shelterId = id;

    shelterApplyMutation.mutate(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        notes,
        shelterId,
      },
      {
        onSuccess: (data) => {
          // On successful application, show message
          handleModalClose();
          setModalMessage("Successfully applied");
          setOpen(true);
        },
        onError: (error) => {
          setModalMessage("Something went wrong. Please try again!");
          setOpen(true);
        },
      }
    );
  };

  // Error message modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Shelter apply modal
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  if (isPending) return <LoadingPage message="Please Wait..." />;

  return (
    <>
      <Container component="main" maxWidth="md" style={{ marginTop: "50px" }}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            {data.name}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Address:</Typography>
              <Typography variant="body1">{data.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Contact Person:</Typography>
              <Typography variant="body1">{data.contact_person}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Contact Number:</Typography>
              <Typography variant="body1">{data.phone_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Shelter email:</Typography>
              <Typography variant="body1">{data.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Shelter Type:</Typography>
              <Typography variant="body1">{data.type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Rebound admin Email:</Typography>
              <Typography variant="body1">{data.created_by}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Description:</Typography>
              <Typography variant="body1">{data.description}</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalOpen}
            >
              Apply
            </Button>
          </Box>
        </Paper>
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
      <ShelterApplyModal
        open={openModal}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ShelterDetailsPage;
