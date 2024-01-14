import React from 'react';
import { Container, Typography, Paper, Grid, Divider, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ShelterDetailsPage = () => {
  const { id } = useParams()

  const shelterDetails = {
    address: "1200 North B Street, Sacramento",
    contact_person: "John Doe",
    created_by: 1,
    created_date: "Fri, 08 Dec 2023 00:00:00 GMT",
    description: "Rehabilitation center for adults.",
    email: "testemail@gmail.com",
    name: "Center of Hope Men's and Women's Shelter",
    phone_number: "9164420331",
    type: "EMERGENCY"
  }

  const {
    address,
    contact_person,
    created_by,
    created_date,
    description,
    email,
    name,
    phone_number,
    type,
  } = shelterDetails;

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          {name}
        </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Address:</Typography>
            <Typography variant="body1">{address}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Contact Person:</Typography>
            <Typography variant="body1">{contact_person}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Phone Number:</Typography>
            <Typography variant="body1">{phone_number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography variant="body1">{email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Type:</Typography>
            <Typography variant="body1">{type}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Created By:</Typography>
            <Typography variant="body1">{created_by}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Created Date:</Typography>
            <Typography variant="body1">{created_date}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description:</Typography>
            <Typography variant="body1">{description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShelterDetailsPage;
