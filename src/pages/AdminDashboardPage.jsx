import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Container, Grid, Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboardPage = () => {
  const totalStudentsData = {
    labels: ['Total Students', 'Persisted', 'Graduated'],
    datasets: [{
      label: '# of Students',
      data: [2809, 2779, 640],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const raceEthnicData = {
    labels: ['African American', 'American Indian', 'Asian', 'Hispanic/Latino', 'Pacific Islander', 'Two or More', 'Unknown', 'White'],
    datasets: [{
      data: [260, 17, 741, 992, 32, 239, 93, 435],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB',
      ],
    }],
  };

  const genderData = {
    labels: ['Female', 'Male', 'Nonbinary'],
    datasets: [{
      data: [1795, 1004, 10],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56',
      ],
    }],
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 6 }}>
        Legislative Basic Needs Report
      </Typography>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
        Based on the number of students served from July 1, 2022 to June 30, 2023
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" align="center">Total Number of Students</Typography>
            <Bar data={totalStudentsData} options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Total Students, Persisted, and Graduated' },
              },
            }} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" align="center">Race/Ethnic Distribution</Typography>
            <Pie data={raceEthnicData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Race/Ethnic Distribution' },
              },
            }} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6" align="center">Distribution by Gender</Typography>
            <Pie data={genderData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Distribution by Gender' },
              },
            }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
