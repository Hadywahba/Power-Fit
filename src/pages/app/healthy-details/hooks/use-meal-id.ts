import { useQuery } from '@tanstack/react-query';
import { getMealsByCategory } from '../apis/get-meal-category-api';

export const useMealId = (meal: string) => {
  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['MealsCategory', meal],
    queryFn: () =>
      getMealsByCategory({
        params: {
          meal,
        },
      }),
    enabled: !!meal,
  });

  return {
    meals,
    isLoading,
    error,
  };
};
