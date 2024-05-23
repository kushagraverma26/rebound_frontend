import { useMutation } from "@tanstack/react-query";
import { put } from "./useAPI";

export const useResourceUpdate = () =>
  useMutation({
    mutationFn: ({ id, data }) => put(`/resources/update/${id}`, data),
  });
