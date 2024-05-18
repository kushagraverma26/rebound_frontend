import { useQuery } from "@tanstack/react-query";
import { get } from "./useAPI";

export const getShelterData = () =>
  useQuery({ queryKey: ["shelters"], queryFn: () => get("shelters") });
