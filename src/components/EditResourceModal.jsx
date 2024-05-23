import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const EditResourceModal = ({ resource, open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    details: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (resource) {
      setFormData({
        id: resource.id || "",
        name: resource.name || "",
        type: resource.type || "",
        description: resource.description || "",
        details: resource.details || "",
        videoUrl: resource.video_url || "",
      });
    }
  }, [resource]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.details) newErrors.details = "Details are required";
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
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" gutterBottom>
          Edit Resource
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
            select
            name="type"
            label="Type"
            required
            fullWidth
            value={formData.type}
            onChange={handleChange}
            sx={{ mb: 2, textAlign: "left" }}
            error={!!errors.type}
            helperText={errors.type}
          >
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="text">Text</MenuItem>
          </TextField>
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
            name="details"
            label="Details"
            required
            fullWidth
            multiline
            rows={4}
            value={formData.details}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.details}
            helperText={errors.details}
          />
          <TextField
            name="videoUrl"
            label="Video URL"
            required={formData.type === "video"}
            fullWidth
            value={formData.videoUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
            error={!!errors.videoUrl}
            helperText={errors.videoUrl}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditResourceModal;
