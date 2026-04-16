import { useParams } from 'react-router-dom';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import { useMealId } from '../hooks/use-meal-id';
import MealCard from './meals-card';
import { useTranslations } from 'use-intl';

export default function MealsCategory() {
  // Translations
  const t = useTranslations('meals');

  // Hook
  const { id } = useParams();

  // Query
  const { meals } = useMealId('Chicken');
  console.log(meals);
  console.log(id);
  return (
    <main
      className={cn(
        'relative min-h-screen w-full',
        'before:absolute before:inset-0',
        "before:bg-[url('/assets/images/person-fit.png')]",
        'before:bg-cover before:bg-center',
        "before:content-['']",
        'after:absolute after:inset-0',
        'after:bg-[#24242499] after:backdrop-blur-xl',
        "after:content-['']",
      )}
    >
      {/* Meals Titles */}
      <section className="relative z-30 flex justify-center pt-8">
        <h1 className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-center text-2xl font-extrabold shadow-md lg:text-4xl">
          {t.rich('meal-title', {
            ingredient: () => (
              <span className="font-bold text-orange-500">{id}</span>
            ),
          })}
        </h1>
      </section>

      {/* Meals Card */}

      <section className="relative z-30 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {meals?.meals?.map((cat) => (
            <MealCard
              key={cat.idMeal}
              idMeal={cat.idMeal}
              strMeal={cat.strMeal}
              strMealThumb={cat.strMealThumb}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
