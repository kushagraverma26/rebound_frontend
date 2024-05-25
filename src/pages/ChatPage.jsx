import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatsPage = () => {
  const [messages, setMessages] = useState([
    { sender: "Me", content: "Hi there!" },
    { sender: "Assistant", content: "Hello! How can I assist you today?" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Set English as default language

  const handleSendMessage = (sender) => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { sender, content: inputMessage }]);
      setInputMessage("");
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }} align="center">
        Rebound Chat
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }} align="center">
        Help is just a text away. Get help in your own language
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8} md={6}>
          <TextField
            select
            fullWidth
            variant="outlined"
            label="Language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            sx={{ width: "100%" }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="zh-cn">Chinese (Simplified)</MenuItem>
            <MenuItem value="tl">Tagalog</MenuItem>
            <MenuItem value="vi">Vietnamese</MenuItem>
            <MenuItem value="ko">Korean</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="ja">Japanese</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              minHeight: "50vh",
              padding: "20px",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((message, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  alignSelf:
                    message.sender === "Me" ? "flex-end" : "flex-start",
                  bgcolor: message.sender === "Me" ? "#3f51b5" : "#f50057",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  mt: 1,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {message.content}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSendMessage("Me")}
              sx={{ ml: 2, height: "56px" }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSendMessage("Assistant")}
            sx={{ mt: 2 }}
          >
            Send from Assistant
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatsPage;
