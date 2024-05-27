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
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../hooks/useChat";
import { useTranslate } from "../hooks/useTranslate";

const ChatsPage = () => {
  const [inputMessage, setInputMessage] = useState("");
  // Array used when displaying the chat
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are an empathetic chat assistant, skilled in dealing with people in distress and understanding their frustations. Provide answers using calming language. Any questions mentioning the word shelter or food should tell user to follow links on the website. Keep your answers short and breif.",
    },
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  // Array used for api calls
  const [messagesForAPI, setMessagesForAPI] = useState([
    {
      role: "system",
      content:
        "You are an empathetic chat assistant, skilled in dealing with people in distress and understanding their frustations. Provide answers using calming language. Any questions mentioning the word shelter or food should tell user to follow links on the website. Keep your answers short and breif.",
    },
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const chatMutation = useChat();
  const translationMutation = useTranslate();

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      // Update the messages state with the user's message
      const previousChat = JSON.parse(JSON.stringify(messages));
      const newMessages = [
        ...messages,
        { role: "user", content: inputMessage },
      ];
      setMessages(newMessages);

      // Clear the input field
      setInputMessage("");

      // Add a loading indicator
      setMessages([...newMessages, { role: "assistant", content: "..." }]);

      // Translate the user's message to English if needed
      let translatedMessage = inputMessage;
      if (selectedLanguage !== "en") {
        // Translate to english
        const translationResponse = await translate(
          inputMessage,
          selectedLanguage,
          "en"
        );
        translatedMessage = translationResponse.translatedText;
      }

      const updatedDataForAPI = [
        ...messagesForAPI,
        { role: "user", content: translatedMessage },
      ];
      setMessagesForAPI(updatedDataForAPI);

      // Remove the loading indicator and update with the API response
      chatMutation.mutate(
        {
          chatData: updatedDataForAPI,
        },
        {
          onSuccess: async (data) => {
            let chatbotResponse = data.response;
            // API needs english only
            setMessagesForAPI((prevMessagesForAPI) => [
              ...prevMessagesForAPI,
              { role: "assistant", content: chatbotResponse },
            ]);

            // Translate back to requested language for rendering
            // User needs to see in selected language
            if (selectedLanguage !== "en") {
              // Translate to source
              const translationResponse = await translate(
                chatbotResponse,
                "en",
                selectedLanguage
              );
              chatbotResponse = translationResponse.translatedText;
            }

            setMessages((prevMessages) => [
              ...prevMessages.slice(0, -1), // Remove the loading indicator
              { role: "assistant", content: chatbotResponse },
            ]);
          },
          onError: (error) => {
            console.error("Error fetching chat response:", error);
            setMessages((prevMessages) => prevMessages.slice(0, -1)); // Remove the loading indicator
          },
        }
      );
    }
  };

  // Translate the message to English
  const translate = async (inputText, sourceLanguage, destLanguage) => {
    const translation = await translationMutation.mutateAsync({
      inputText,
      sourceLanguage,
      destLanguage,
    });
    return translation;
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
            {messages
              .filter(
                (message) =>
                  message.role === "user" || message.role === "assistant"
              )
              .map((message, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    alignSelf:
                      message.role === "user" ? "flex-end" : "flex-start",
                    bgcolor: message.role === "user" ? "#3f51b5" : "#f50057",
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
              name="inputMessage"
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ ml: 2, height: "50px" }} // Adjusted height
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatsPage;
