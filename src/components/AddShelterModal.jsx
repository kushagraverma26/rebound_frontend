import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AddShelterModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-shelter-modal-title"
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
        <Typography variant="h6" id="add-shelter-modal-title" gutterBottom>
          Add Shelter
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            required
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="type"
            label="Type"
            required
            fullWidth
            value={formData.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.type}
            helperText={errors.type}
          />
          <TextField
            name="description"
            label="Description"
            required
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.description}
            helperText={errors.description}
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
            required
            fullWidth
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            name="email"
            label="Email"
            required
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            name="address"
            label="Address"
            required
            fullWidth
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.address}
            helperText={errors.address}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Shelter
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddShelterModal;
