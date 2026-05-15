import { useTranslations } from 'use-intl';
import { useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import { ROUTES } from '@/lib/constants/routes/routes.constant';

export default function NotFound() {
  // Hooks
  const t = useTranslations('not-found');
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        'relative isolate flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden',
        'px-4 py-16 text-center',
      )}
    >
      {/* ─── Background Word ─── */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'font-extrabold tracking-widest uppercase',
          'text-[80px] sm:text-[120px] lg:text-[160px]',
          'whitespace-nowrap select-none',
          'text-transparent',
          'from-foreground/10 bg-linear-to-r to-[#232425]',
          'bg-clip-text [-webkit-background-clip:text]',
          '[-webkit-text-stroke:1px_rgba(255,255,255,0.04)]',
        )}
      ></div>

      {/* ─── Glow ─── */}
      <div
        aria-hidden="true"
        className="bg-main/10 absolute top-1/2 left-1/2 h-40 w-80 -translate-x-1/2 -translate-y-1/2 blur-3xl"
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="bg-main/35 dark:bg-main/25 absolute inset-0 rounded-full blur-xl"
          />
          <div className="text-main relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-semibold">
            <CircleX />
            <span>{t('badge')}</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className={cn(
            'text-foreground font-bold uppercase',
            'text-[40px] leading-[1.3] sm:text-[52px]',
            'tracking-[0.02em]',
          )}
        >
          <span className="text-foreground">{t('title-start')} </span>
          <span className="text-main">{t('title-highlight')}</span>
          <span className="text-foreground"> {t('title-end')}</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground max-w-md text-base leading-relaxed">
          {t('description')}
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate(ROUTES.app.root)}
          className={cn(
            'mt-2 inline-flex items-center gap-2 rounded-full px-8 py-3',
            'bg-main text-sm font-semibold tracking-wider text-white uppercase',
            'hover:bg-main/85 transition-all duration-200 hover:scale-105 active:scale-95',
            'focus-visible:ring-main focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          )}
        >
          {t('go-home')}
        </button>
      </div>
    </section>
  );
}
