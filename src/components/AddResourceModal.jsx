import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddResourceModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    details: '',
    videoUrl: ''
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
      aria-labelledby="add-resource-modal-title"
      aria-describedby="add-resource-modal-description"
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
        <Typography variant="h6" id="add-resource-modal-title" component="h2" gutterBottom>
          Add Resource
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
            name="details"
            label="Details"
            fullWidth
            multiline
            rows={4}
            value={formData.details}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="videoUrl"
            label="Video URL"
            fullWidth
            value={formData.videoUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Resource
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddResourceModal;
