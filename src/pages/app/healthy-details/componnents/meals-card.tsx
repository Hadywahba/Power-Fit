import { useMeal } from '@/components/providers/meals/meal-provider';
import { cn } from '@/lib/utils/tailwind-merge/cn';

interface CategoryProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealCard({
  idMeal,
  strMeal,
  strMealThumb,
}: CategoryProps) {
  // Context
  const { setMealId, mealId } = useMeal();

  //  Variable
  const isActive = mealId === idMeal;

  return (
    <div
      onClick={() => setMealId(idMeal)}
      className={cn(
        'flex cursor-pointer items-center gap-4 border-b border-white/5 px-4 py-3 transition-colors last:border-0 hover:bg-white/5',
        isActive && 'border-orange-500/30 bg-orange-500/10',
      )}
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        className={cn(
          'size-20 shrink-0 rounded-xl border border-white/10 object-cover transition',
          isActive && 'border-orange-400',
        )}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'mb-0.5 text-sm font-medium text-gray-100',
            isActive && 'text-orange-300',
          )}
        >
          {strMeal}
        </p>
      </div>

      <span
        className={cn(
          'shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium',
          isActive
            ? 'border-orange-500/50 bg-orange-500/20 text-orange-300'
            : 'border-orange-900/50 bg-orange-950 text-orange-300',
        )}
      >
        #{idMeal}
      </span>

      <span className={cn('text-gray-600', isActive && 'text-orange-400')}>
        ›
      </span>
    </div>
  );
}
