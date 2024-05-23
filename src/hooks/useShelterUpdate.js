import { useMutation } from "@tanstack/react-query";
import { put } from "./useAPI";

export const useShelterUpdate = () =>
  useMutation({
    mutationFn: ({ id, data }) => put(`/shelters/update/${id}`, data),
  });
