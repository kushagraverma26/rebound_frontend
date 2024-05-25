import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useTranslate = () =>
  useMutation({
    mutationFn: (data) => post("/translate", data),
  });
