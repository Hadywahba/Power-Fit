import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import HeroCarousel from './hero-carousel';
import { stats } from '@/lib/constants/home/hero.constants';
import { useTranslations } from 'use-intl';

export default function HeroSection() {
  // Translations
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen flex-col bg-white bg-[url('/assets/images/Theo_Vance.png')] bg-cover bg-bottom-right bg-no-repeat text-zinc-800 md:min-h-[200px] dark:bg-transparent dark:text-white">
      {/* Gradient */}
      <div
        className="absolute inset-0 bg-linear-to-l from-white/90 via-white/75 to-white/50 backdrop-blur-2xl dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-800/40"
        aria-hidden="true"
      />

      {/* Hero content row */}
      <div className="relative z-10 flex flex-col items-center px-6 py-16 sm:px-12 md:flex-row md:px-20 md:py-0">
        {/* Text Content*/}
        <div className="w-full text-center md:max-w-[55%] md:flex-1 md:pe-8 md:text-start">
          <h1 className="mb-6 text-3xl leading-normal font-bold uppercase sm:text-4xl md:text-5xl">
            {t.rich('title', {
              span: (chunks) => <span className="text-main">{chunks}</span>,
            })}
          </h1>

          <p className="before:bg-main relative mb-8 max-w-160 ps-4 text-base font-normal text-zinc-600 before:absolute before:inset-y-0 before:start-0 before:w-1 sm:text-lg md:text-xl dark:text-white/80">
            {t('description')}
          </p>

          {/* Stats List */}
          <ul className="mb-10 flex flex-wrap justify-center gap-6 py-5 sm:gap-10 md:mb-16 md:justify-start md:gap-12">
            {stats.map((state) => (
              <li key={state.id} className="text-center md:text-start">
                <span className="text-xl font-bold sm:text-2xl">
                  {state.number}
                </span>
                <span className="mt-1 block text-base font-normal text-zinc-700 sm:text-xl dark:text-white/90">
                  {t(`stats.${state.id}`)}
                </span>
              </li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex justify-center gap-3 md:justify-start">
            <Button>{t('cta.start')}</Button>
            <Button
              variant="outline"
              className="border-main text-main hover:bg-main/10 hover:text-main dark:bg-transparent"
            >
              {t('cta.explore')}
            </Button>
          </div>
        </div>

        {/* Right image */}
        <div className="relative flex max-h-80 w-full items-end justify-center pt-10 sm:max-h-120 md:max-h-180 md:flex-1 md:pt-5">
          <Image
            src="/assets/images/Theo-Vance.svg"
            alt={t('imageAlt')}
            width={467}
            height={700}
            className="object-contain object-top"
          />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative z-10 mt-auto">
        <HeroCarousel />
      </div>
    </section>
  );
}
