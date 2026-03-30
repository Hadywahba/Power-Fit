import LocaleSwitcher from '@/components/shared/locale-switcher';
import ThemeToggle from '@/components/shared/theme-toggle';
import type { ReactNode } from 'react';
import { useTranslations } from 'use-intl';

export default function ClassesPage() {
  // Translations
  const t = useTranslations('classes');

  return (
    <main className="relative min-h-screen bg-[url('/assets/images/floor.png')] bg-cover bg-bottom bg-no-repeat">
      <ThemeToggle />
      <LocaleSwitcher />
      <div className="absolute top-10 w-full h-100 bg-white/60 backdrop-blur-3xl dark:bg-black/60 dark:backdrop-blur-md">
        <section className="mx-auto max-w-159.25">
          <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2">
            <img src="/assets/icon/muscle.svg" alt="muscle" />
            <p className="text-main text-center text-sm font-semibold">
              {t('fitness-class')}
            </p>
          </div>
          <h1 className="text-charcoal dark:text-charcoal leading-10 pt-4 text-center text-xl font-bold uppercase sm:text-2xl md:text-3xl">
            {t.rich('workout-title', {
              span: (chunks: ReactNode) => (
                <span className="text-main">{chunks}</span>
              ),
            })}
          </h1>
        </section>
      </div>
    </main>
  );
}
