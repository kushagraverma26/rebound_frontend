import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getShelterDetails } from "../hooks/useShelterDetails";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import ShelterApplyModal from "../components/ShelterApplyModal";

const ShelterDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = getShelterDetails(id);
  const [openModal, setOpenModal] = useState(false);


  const handleSubmit = (formData) => {
    // Send PUT request to API with formData
    console.log("Submitting form data:", formData);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  if (loading) {
    return <LoadingPage message="Please Wait..." />;
  }

  if (error) {
    console.log(error);
    return <ErrorPage />;
  }

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
              <Typography variant="subtitle1">Phone Number:</Typography>
              <Typography variant="body1">{data.phone_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Email:</Typography>
              <Typography variant="body1">{data.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Type:</Typography>
              <Typography variant="body1">{data.type}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Created By:</Typography>
              <Typography variant="body1">{data.created_by}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Created Date:</Typography>
              <Typography variant="body1">{data.created_date}</Typography>
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
      <ShelterApplyModal
        open={openModal}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ShelterDetailsPage;
