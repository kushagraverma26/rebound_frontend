import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// DIfferent from other hooks since it has a different server
// Backend of chat server
const client = axios.create({ baseURL: "http://127.0.0.1:8005" });

const post = (endpoint, data) =>
  client.post(endpoint, data).then((res) => res.data);

export const useChat = () =>
  useMutation({
    mutationFn: (data) => post("/chat/", data),
  });
