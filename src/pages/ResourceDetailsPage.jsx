import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  Backdrop,
  Button,
  Modal,
} from "@mui/material";
import { getResourceDetails } from "../hooks/useResourceDetails";
import { useTranslate } from "../hooks/useTranslate";
import { useGenerateTranscript } from "../hooks/useGenerateTranscript";
import { extractVideoID } from "../utils/helpers";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

const ResourceDetailsPage = () => {
  const { id } = useParams();
  const { isPending, isError, data, error } = getResourceDetails(id);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [translatedDetails, setTranslatedDetails] = useState("");
  const [isTranscriptModalOpen, setTranscriptModalOpen] = useState(false);
  const [transcriptLanguage, setTranscriptLanguage] = useState("en");
  const [transcript, setTranscript] = useState("");

  const translationMutation = useTranslate();
  const generateTranscriptMutation = useGenerateTranscript();

  // flag tells what to translate
  // 0 = resource details
  // 1 = transcript
  const handleLanguageChange = async (event, flag) => {
    const destLanguage = event.target.value;
    // setting the value for appropriate dropdown based on flag
    if (flag === 0) setSelectedLanguage(destLanguage);
    else if (flag === 1) setTranscriptLanguage(destLanguage);

    if (destLanguage === "") {
      setTranslatedDetails(data.details);
    } else {
      const sourceLanguage = selectedLanguage || "en";
      let inputText = flag === 0 ? data.details : transcript;
      translateData(inputText, sourceLanguage, destLanguage, flag);
    }
  };

  const translateData = (inputText, sourceLanguage, destLanguage, flag) => {
    translationMutation.mutate(
      { inputText, sourceLanguage, destLanguage },
      {
        onSuccess: (data) => {
          if (flag === 0) {
            setTranslatedDetails(data.translatedText);
          } else if (flag === 1) {
            setTranscript(data.translatedText);
          }
        },
        onError: (error) =>
          console.error("Error translating resource details:", error),
      }
    );
  };

  const handleGenerateTranscript = () => {
    setTranscriptModalOpen(true);
    if (!transcript)
      generateTranscript(extractVideoID(data.video_url), transcriptLanguage);
  };

  const generateTranscript = (videoId) => {
    generateTranscriptMutation.mutate(
      { videoId },
      {
        onSuccess: (data) => setTranscript(data.transcript),
        onError: (error) =>
          console.error("Error generating transcript:", error),
      }
    );
  };

  if (isPending) {
    return <LoadingPage message="Please Wait..." />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {translationMutation.isPending && (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress
            size={50}
            style={{ marginBottom: "20px" }}
            color="primary"
          />
        </Backdrop>
      )}
      <Paper sx={{ p: 4 }}>
        {data.type === "video" && data.video_url && (
          <>
            <CardMedia
              component="iframe"
              src={`https://www.youtube.com/embed/${extractVideoID(
                data.video_url
              )}`}
              title={data.name}
              sx={{ mb: 4, height: "400px" }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateTranscript}
              >
                Generate Transcript
              </Button>
            </Box>
          </>
        )}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Select Resource Details Language</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={(event) => handleLanguageChange(event, 0)}
          >
            <MenuItem value="">Select Language</MenuItem>
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
          </Select>
        </FormControl>

        <Typography variant="h4" component="h1" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Created by: {data.created_by} on{" "}
          {new Date(data.created_date).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {translatedDetails || data.details}
        </Typography>
      </Paper>
      <Modal
        open={isTranscriptModalOpen}
        onClose={() => setTranscriptModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${extractVideoID(
              data.video_url
            )}`}
            title={data.name}
            sx={{ mb: 4, height: "300px" }}
          />
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Select Transcript Language</InputLabel>
            <Select
              value={transcriptLanguage}
              onChange={(event) => handleLanguageChange(event, 1)}
            >
              <MenuItem value="">Select Language</MenuItem>
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
            </Select>
          </FormControl>
          <Typography variant="body1">
            {generateTranscriptMutation.isPending ||
            translationMutation.isPending ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
              </Box>
            ) : (
              transcript
            )}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
};

export default ResourceDetailsPage;
