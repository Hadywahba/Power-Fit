import type { Exercise } from "@/lib/types/exercises";
import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../apis/exercises.api";

export const useGetExercises = (muscleId: string, difficultyId: string) =>
  useQuery<Exercise[]>({
    queryKey: ["exercises", muscleId, difficultyId],
    enabled: !!muscleId && !!difficultyId,
    queryFn: async () => {
      const data = await getExercises(muscleId, difficultyId);

      return data.exercises;
    },
  });

