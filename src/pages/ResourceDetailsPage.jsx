import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  CardMedia,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getResourceDetails } from '../hooks/useResourceDetails';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

const ResourceDetailsPage = () => {
  const { id } = useParams();
  const { data, loading, error } = getResourceDetails(id);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [translatedDetails, setTranslatedDetails] = useState('');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    translateResourceDetails(data.details, event.target.value);
  };

  const translateResourceDetails = async (text, language) => {
    try {
      // const response = await fetch(`/api/translation?text=${encodeURIComponent(text)}&language=${language}`);
      // const translatedData = await response.json();
      let translatedData = {
        "translatedText": "Yayy"
      }
      setTranslatedDetails(translatedData.translatedText);
    } catch (error) {
      console.error('Error translating resource details:', error);
    }
  };

  if (loading) {
    return <LoadingPage message="Please Wait..." />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Paper sx={{ p: 4 }}>
        {data.type === 'video' && data.video_url && (
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${data.video_url}`}
            title={data.name}
            sx={{ mb: 4, height: '400px' }}
          />
        )}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Language</InputLabel>
          <Select value={selectedLanguage} onChange={handleLanguageChange}>
            <MenuItem value="">Select Language</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
            <MenuItem value="Tagalog">Tagalog</MenuItem>
            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
            <MenuItem value="Korean">Korean</MenuItem>
            <MenuItem value="Arabic">Arabic</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Japanese">Japanese</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h4" component="h1" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Created by: {data.created_by} on {new Date(data.created_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
        {translatedDetails || data.details}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ResourceDetailsPage;
