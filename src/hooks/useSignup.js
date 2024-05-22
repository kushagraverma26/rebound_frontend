import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useSignup = () =>
  useMutation({
    mutationFn: (data) => post("/admins/create", data),
  });
