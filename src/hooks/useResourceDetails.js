import { useQuery } from "@tanstack/react-query";
import { get } from "./useAPI";

export const getResourceDetails = (id) =>
  useQuery({
    queryKey: ["resources", id],
    queryFn: () => get(`resources/details?id=${id}`),
  });
