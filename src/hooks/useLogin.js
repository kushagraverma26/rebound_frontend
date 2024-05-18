import { useMutation } from "@tanstack/react-query";
import { post } from "./useAPI";

export const useLogin = () =>
  useMutation({
    mutationFn: (data) => post("/admins/login", data),
  });
