import { cn } from '@/lib/utils/tailwind-merge/cn';
import Meals from './componnents/meals';
import MealsCategory from './componnents/meals-category';
import { useTranslations } from 'use-intl';
import { useParams } from 'react-router-dom';
import { MealProvider } from '@/components/providers/meals/meal-provider';

export default function Page() {
  // Translations
  const t = useTranslations('meals');

  // Hook
  const { id } = useParams();

  console.log(id);
  if (!id) return null;

  return (
    <MealProvider>
      <main
        className={cn(
          'relative grid  w-full grid-cols-1 md:grid-cols-12',
          'before:absolute before:inset-0',
          "before:bg-[url('/assets/images/person-fit.png')]",
          'before:bg-cover before:bg-center',
          "before:content-['']",
          'after:absolute after:inset-0',
          'after:bg-[#24242499] after:backdrop-blur-xl',
          "after:content-['']",
        )}
      >
        {/* Meals Title - Full Width */}
        <section className="relative z-30 col-span-12 flex justify-center pt-8 pb-6 ">
          <h1 className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-center text-2xl font-extrabold shadow-md lg:text-4xl">
            {t.rich('meal-title', {
              ingredient: () => (
                <span className="font-bold text-orange-500">{id}</span>
              ),
            })}
          </h1>
        </section>

        {/* Left Side */}

        <section className="relative z-30 md:col-span-6">
          <MealsCategory id={id} />
        </section>
        {/* Right Side */}
        <section className="relative z-30 md:col-span-6">
          <Meals />
        </section>
      </main>
    </MealProvider>
  );
}
