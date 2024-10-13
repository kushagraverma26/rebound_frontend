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
      const previousChat = JSON.parse(JSON.stringify(messages));
      const newMessages = [
        ...messages,
        { role: "user", content: inputMessage },
      ];
      setMessages(newMessages);

      setInputMessage("");

      setMessages([...newMessages, { role: "assistant", content: "..." }]);

      let translatedMessage = inputMessage;
      if (selectedLanguage !== "en") {
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
              ...prevMessages.slice(0, -1),
              { role: "assistant", content: chatbotResponse },
            ]);
          },
          onError: (error) => {
            console.error("Error fetching chat response:", error);
            setMessages((prevMessages) => prevMessages.slice(0, -1));
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
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);

    const currentGreeting = messages[1].content;

    const isInitialGreeting =
      Object.values(greetingTranslations).includes(currentGreeting);

    if (messages.length === 2 && isInitialGreeting) {
      const translatedGreeting =
        greetingTranslations[newLanguage] ||
        "Hello! How can I assist you today?";

      setMessages([
        messages[0],
        { role: "assistant", content: translatedGreeting },
      ]);
    }
  };

  const greetingTranslations = {
    en: "Hello! How can I assist you today?",
    es: "¡Hola! ¿Cómo puedo asistirte hoy?",
    "zh-cn": "你好！我今天能帮您什么吗？",
    tl: "Kumusta! Paano kita matutulungan ngayon?",
    vi: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
    ko: "안녕하세요! 오늘 어떻게 도와드릴까요?",
    ar: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
    fr: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    hi: "नमस्ते! मैं आज आपकी कैसे सहायता कर सकता हूँ?",
    ja: "こんにちは！今日はどのようにお手伝いできますか？",
  };

  const messageLabelTranslations = {
    en: "Type your message",
    es: "Escribe tu mensaje",
    "zh-cn": "输入你的信息",
    tl: "I-type ang iyong mensahe",
    vi: "Nhập tin nhắn của bạn",
    ko: "메시지를 입력하세요",
    ar: "اكتب رسالتك",
    fr: "Tapez votre message",
    hi: "अपना संदेश टाइप करें",
    ja: "メッセージを入力してください",
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
              label={
                messageLabelTranslations[selectedLanguage] ||
                "Type your message"
              }
              name="inputMessage"
              value={inputMessage}
              onChange={(event) => setInputMessage(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ ml: 2, height: "50px" }}
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
