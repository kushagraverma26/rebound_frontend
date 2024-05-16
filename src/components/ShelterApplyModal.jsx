import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';

const ShelterApplyModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="shelter-apply-modal-title"
      aria-describedby="shelter-apply-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" id="shelter-apply-modal-title" component="h2" gutterBottom>
          Apply to Shelter
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="gender"
            label="Gender"
            fullWidth
            value={formData.gender}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="notes"
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShelterApplyModal;
