import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import RoofingIcon from '@mui/icons-material/Roofing';

import { getShelterData } from '../hooks/useShelterData';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';


const cards = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  image: `https://source.unsplash.com/random?nature=${index + 1}`,
  heading: `Card ${index + 1} Heading`,
  subheading: 'Subtitle or additional information',
}));

const SheltersPage = () => {
  const { data, loading, error } = getShelterData()
  
  if (loading) {
    return <LoadingPage message="Please Wait..."/>;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Housing Resources
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Find information about available shelters in your area.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {data.map((shelter) => (
          <Card
            component={Link}
            to={`/shelters/${shelter.id}`}
            key={shelter.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              borderRadius: '20px',
              overflow: 'hidden',
              mb: 4,
              textDecoration: "none"
            }}
          >
            {/* <CardMedia
              component="div"
              sx={{
                width: '40%', 
                pt: '20%',
                backgroundImage: `url(${shelter.image})`,
                backgroundSize: 'cover',
              }}
            /> */}
            <CardMedia  sx={{
                width: '40%', 
                backgroundSize: 'cover',
              }}> <RoofingIcon color="primary" sx={{fontSize: 150}}/></CardMedia>
            <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
              <Typography gutterBottom variant="h5" component="h5" textAlign="center">
                {shelter.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {shelter.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Quick Apply</Button>
            </CardActions>
          </Card>
        ))}
      </Container>
    </> 
    
    )
}

export default SheltersPage

