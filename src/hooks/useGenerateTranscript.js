import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useGenerateTranscript = () =>
  useMutation({
    mutationFn: (data) => post("/generateTranscript", data),
  });
