import { cn } from '@/lib/utils/tailwind-merge/cn';
import Meals from './componnents/meals';
import MealsCategory from './componnents/meals-category';
import { useTranslations } from 'use-intl';
import { useParams } from 'react-router-dom';
import { MealProvider } from '@/components/providers/meals/meal-provider';
import PageHero from '@/components/shared/page-hero';
import { Dumbbell } from 'lucide-react';

export default function Page() {
  // Translations
  const t = useTranslations('');

  // Hook
  const { id } = useParams();

  if (!id) return null;

  return (
    <MealProvider>
      <main
        className={cn(
          'relative grid w-full grid-cols-1 md:grid-cols-12',
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
        <section className="relative z-30 col-span-12 flex justify-center pt-20 pb-2">
          <PageHero
            badge={t('healthy-badge')}
            titleStart={t('healthy-heading-start')}
            titleHighlight={t('healthy-heading-highlight')}
            titleEnd={t('healthy-heading-end')}
            backgroundText={t('healthy-background-text')}
            icon={<Dumbbell size={20} />}
            className="pt-8 pb-6 sm:pt-10"
            titleClassName="max-w-190 text-[30px] leading-[1.22] text-white sm:text-[42px]"
          />
        </section>

        {/* Left Side */}

        <section className="relative z-30 col-span-12 h-full md:col-span-4">
          <MealsCategory title={id} />
        </section>
        {/* Right Side */}
        <section className="relative z-30 col-span-12 h-full md:col-span-8">
          <Meals />
        </section>
      </main>
    </MealProvider>
  );
}
