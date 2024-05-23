import { useMutation } from "@tanstack/react-query";
import { axiosDelete } from "./useAPI";

export const useResourceDelete = () =>
  useMutation({
    mutationFn: (id) => axiosDelete(`/resources/delete/${id}`),
  });
