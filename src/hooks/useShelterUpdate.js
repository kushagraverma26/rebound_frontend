import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useShelterUpdate = (id) =>
  useMutation({
    mutationFn: (data) => post(`/shelters/update/${id}`, data),
  });
