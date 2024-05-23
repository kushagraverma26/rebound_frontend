import { useQuery } from "@tanstack/react-query";
import { get } from "./useAPI";

export const getResourceData = () =>
  useQuery({ queryKey: ["resources"], queryFn: () => get("resources") });
