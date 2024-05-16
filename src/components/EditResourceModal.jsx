import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const EditResourceModal = ({ resource, open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        details: "",
        videoUrl: "",
      });
    
      useEffect(() => {
        if (resource) {
          setFormData({
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="details"
            label="Details"
            value={formData.details}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="videoUrl"
            label="Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}> 
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditResourceModal;
