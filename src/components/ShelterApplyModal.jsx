import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";

const ShelterApplyModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }
    if (
      !formData.phoneNumber.trim() ||
      !/^\d{10}$/.test(formData.phoneNumber)
    ) {
      validationErrors.phoneNumber = "A valid phone number is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        <Typography
          variant="h6"
          id="shelter-apply-modal-title"
          component="h2"
          gutterBottom
        >
          Apply to Shelter
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            required
            value={formData.firstName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            select
            name="gender"
            label="Gender"
            fullWidth
            value={formData.gender}
            onChange={handleChange}
            sx={{ mb: 2, textAlign: "left" }}
            error={!!errors.gender}
            helperText={errors.gender}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Transgender</MenuItem>
            <MenuItem value="Other">Non-binary/non-conforming</MenuItem>
            <MenuItem value="Other">Prefer not to respond</MenuItem>
          </TextField>
          <TextField
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
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
            error={!!errors.notes}
            helperText={errors.notes}
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
