import { useQuery } from "@tanstack/react-query";
import { get } from "./useAPI";

export const getShelterDetails = (id) =>
  useQuery({
    queryKey: ["shelters", id],
    queryFn: () => get(`shelters/details?id=${id}`),
  });
