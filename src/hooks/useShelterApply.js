import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useShelterApply = () =>
  useMutation({
    mutationFn: (data) => post("/applications/create", data),
  });
