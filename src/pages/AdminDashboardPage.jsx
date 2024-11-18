import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

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
  // Pantry data for multiple semesters
  const pantryDataBySemester = {
    "Fall 2022": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
        "Week 15",
        "Week 16",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [
            409, 385, 440, 477, 481, 468, 327, 415, 402, 360, 397, 398, 211,
            382, 424, 187,
          ],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Winter Intersession 2022": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [
        {
          label: "Total Visits",
          data: [55, 0, 46, 72, 68],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Spring 2023": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
        "Week 15",
        "Week 16",
        "Week 17",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [
            333, 285, 309, 317, 315, 307, 341, 286, 58, 259, 156, 319, 359, 347,
            334, 562, 536,
          ],
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Summer 2023": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [
            65, 50, 125, 160, 125, 153, 101, 164, 141, 151, 144, 145, 156, 131,
          ],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Fall 2023": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
        "Week 15",
        "Finals",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [
            473, 429, 508, 528, 551, 588, 493, 510, 508, 470, 376, 440, 250,
            505, 390, 281,
          ],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Winter Intersession 2023": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      datasets: [
        {
          label: "Total Visits",
          data: [52, 0, 40, 33, 49],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Spring 2024": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Spring Break",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
        "Week 15",
        "Finals",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [
            344, 463, 497, 497, 267, 531, 476, 449, 108, 492, 434, 465, 471,
            482, 480, 390, 134,
          ],
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Summer 2024": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8",
        "Week 9",
        "Week 10",
        "Week 11",
        "Week 12",
        "Week 13",
        "Week 14",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [52, 75, 107, 112, 96, 118, 82, 119, 108, 99, 97, 106, 97, 73],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    "Fall 2024": {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
      ],
      datasets: [
        {
          label: "Total Visits",
          data: [392, 430, 549, 547, 527, 487, 70],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
  };

  const pantryReasonData = {
    labels: [
      "I want to supplement the other food I purchase or receive",
      "I've run out of money for food",
      "I cannot afford to purchase from my local grocery stores",
      "The ASI Food Pantry is more accessible than my local grocery store",
      "My CalFresh application is pending and I am in need of food",
      "I've run out of money for food, I cannot afford to purchase from my local grocery stores",
      "Other",
    ],
    datasets: [
      {
        label: "Reasons for Using ASI Food Pantry",
        data: [30, 25, 16, 14, 8, 8, 37],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6345",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6345",
        ],
      },
    ],
  };

  // State to keep track of the selected semester
  const [selectedSemester, setSelectedSemester] = useState("Fall 2022");

  // Basic Needs Report Data (existing charts)
  const totalStudentsData = {
    labels: ["Total Students", "Persisted", "Graduated"],
    datasets: [
      {
        label: "# of Students",
        data: [2809, 2779, 640],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const raceEthnicData = {
    labels: [
      "African American",
      "American Indian",
      "Asian",
      "Hispanic/Latino",
      "Pacific Islander",
      "Two or More",
      "Unknown",
      "White",
    ],
    datasets: [
      {
        data: [260, 17, 741, 992, 32, 239, 93, 435],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
        ],
      },
    ],
  };

  const genderData = {
    labels: ["Female", "Male", "Nonbinary"],
    datasets: [
      {
        data: [1795, 1004, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Handle semester change
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
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
            Dashboard
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Gain insights into trends through visualizations.
          </Typography>
        </Container>
      </Box>
      {/* ASI Food Pantry Data Section */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 6 }}>
        ASI Food Pantry Data
      </Typography>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Pantry Usage Statistics
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Bar chart card with dropdown */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" align="center">
                Pantry Visits by Week ({selectedSemester})
              </Typography>
              {/* Dropdown for semester selection inside the chart card */}
              <Select
                value={selectedSemester}
                onChange={handleSemesterChange}
                style={{ minWidth: 150 }}
              >
                {Object.keys(pantryDataBySemester).map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    {semester}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Bar
              data={pantryDataBySemester[selectedSemester]}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: "Total Visits by Week" },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" align="center">
              Reasons for Using ASI Food Pantry
            </Typography>
            <Pie
              data={pantryReasonData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Reasons for Using ASI Food Pantry",
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Legislative Basic Needs Report Section */}
      <Typography variant="h3" align="center" gutterBottom sx={{ mt: 6 }}>
        Legislative Basic Needs Report
      </Typography>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Based on the number of students served from July 1, 2022 to June 30,
        2023
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" align="center">
              Total Number of Students
            </Typography>
            <Bar
              data={totalStudentsData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: "Total Students, Persisted, and Graduated",
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" align="center">
              Race/Ethnic Distribution
            </Typography>
            <Pie
              data={raceEthnicData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Race/Ethnic Distribution" },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" align="center">
              Distribution by Gender
            </Typography>
            <Pie
              data={genderData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Distribution by Gender" },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
