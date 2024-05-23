import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useResourceAdd = () =>
  useMutation({
    mutationFn: (data) => post("/resources/create", data),
  });
