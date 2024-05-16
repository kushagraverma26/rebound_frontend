import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const EditShelterModal = ({ open, onClose, shelter }) => {
  const [formData, setFormData] = useState({
    id: shelter?.id || "",
    name: shelter?.name || "",
    type: shelter?.type || "",
    description: shelter?.description || "",
    contactPerson: shelter?.contact_person || "",
    phoneNumber: shelter?.phone_number || "",
    email: shelter?.email || "",
    address: shelter?.address || "",
    createdBy: shelter?.created_by || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/shelters/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update shelter');
      }
      onClose();
      // Optionally, you can handle success behavior like showing a success message or updating state
    } catch (error) {
      console.error('Error updating shelter:', error);
      // Optionally, you can handle error behavior like showing an error message
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-shelter-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" id="edit-shelter-modal-title" gutterBottom>
          Edit Shelter
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="type"
            label="Type"
            fullWidth
            value={formData.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="contactPerson"
            label="Contact Person"
            fullWidth
            value={formData.contactPerson}
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
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="address"
            label="Address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="createdBy"
            label="Created By"
            fullWidth
            value={formData.createdBy}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Shelter
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditShelterModal;
