import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useShelterDelete = (id) =>
  useMutation({
    mutationFn: (data) => post(`/shelters/delete/${id}`, data),
  });
