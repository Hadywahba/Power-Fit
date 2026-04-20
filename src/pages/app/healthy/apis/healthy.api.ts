import type { HealthyCategoriesPayload } from '@/lib/types/healthy';
import { apiRequest } from '@/lib/utils/api/api-request';

const HEALTHY_CATEGORIES_ENDPOINT =
  'https://www.themealdb.com/api/json/v1/1/categories.php';

// Get all meal categories
export const getHealthyCategories = () =>
  apiRequest<HealthyCategoriesPayload>({
    endpoint: HEALTHY_CATEGORIES_ENDPOINT,
  });
