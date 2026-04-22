import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../apis/exercises.api";
import type { Level } from "@/lib/types/exercises";

export const useGetLevels = () =>
  useQuery<Level[]>({
    queryKey: ["levels"],
    queryFn: getLevels,
    staleTime: 1000 * 60 * 60,
  });