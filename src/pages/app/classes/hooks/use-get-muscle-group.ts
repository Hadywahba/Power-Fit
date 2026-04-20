import type { MuscleGroup } from "@/lib/types/muscle";
import { useQuery } from "@tanstack/react-query";
import { getMuscles } from "../apis/muscle.api";

export const useGetMuscleGroups = () =>
  useQuery<MuscleGroup[]>({
    queryKey: ["muscle-groups"],
    queryFn: async () => {
      const data = await getMuscles();
      return data.musclesGroup;
    },
  });
