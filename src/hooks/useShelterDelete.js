import { useMutation } from "@tanstack/react-query";
import { axiosDelete } from "./useAPI";

export const useShelterDelete = () =>
  useMutation({
    mutationFn: (id) => axiosDelete(`/shelters/delete/${id}`),
  });
