import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useShelterAdd = () =>
  useMutation({
    mutationFn: (data) => post("/shelters/create", data),
  });
