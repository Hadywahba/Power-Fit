import { ShieldCheck, Lock, KeyRound, Smartphone, Eye } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import PageHero from '@/components/shared/page-hero';

export default function SecurityPage() {
  const t = useTranslations('security-page');

  const tips = [
    { icon: KeyRound, titleKey: 'tip1-title', bodyKey: 'tip1-body' },
    { icon: Smartphone, titleKey: 'tip2-title', bodyKey: 'tip2-body' },
    { icon: Eye, titleKey: 'tip3-title', bodyKey: 'tip3-body' },
    { icon: Lock, titleKey: 'tip4-title', bodyKey: 'tip4-body' },
  ] as const;

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      {/* Hero */}
      <PageHero
        badge={t('title')}
        backgroundText={t('title')}
        icon={<ShieldCheck size={20} />}
        className="pt-8 pb-6 sm:pt-10"
        titleClassName="max-w-190 text-[30px] leading-[1.22] text-white sm:text-[42px]"
      />
      <div className="relative overflow-hidden bg-zinc-900 px-6 py-16 text-white sm:px-10">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="bg-main flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-wide uppercase sm:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">{t('subtitle')}</p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
            {t('intro')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        {/* Security tips grid */}
        <h2 className="mb-6 text-xl font-black tracking-wide text-zinc-900 uppercase dark:text-white">
          {t('tips-heading')}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {tips.map(({ icon: Icon, titleKey, bodyKey }) => (
            <div
              key={titleKey}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="bg-main/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <Icon size={18} className="text-main" />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-black tracking-wide text-zinc-900 uppercase dark:text-white">
                  {t(titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(bodyKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Data protection section */}
        <div className="mt-10 space-y-6">
          <h2 className="text-xl font-black tracking-wide text-zinc-900 uppercase dark:text-white">
            {t('data-heading')}
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('data-body')}
          </p>
        </div>

        {/* Change password CTA */}
        <div className="border-main/30 bg-main/5 mt-10 flex items-center justify-between rounded-2xl border p-6">
          <div>
            <h3 className="font-black tracking-wide text-zinc-900 uppercase dark:text-white">
              {t('cta-title')}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t('cta-body')}
            </p>
          </div>
          <Link
            to={ROUTES.app.profile}
            className="bg-main hover:bg-main/90 shrink-0 rounded-full px-5 py-2.5 text-sm font-bold text-white transition"
          >
            {t('cta-btn')}
          </Link>
        </div>

        <div className="mt-8">
          <Link
            to={ROUTES.app.profile}
            className="text-main inline-flex items-center gap-2 text-sm font-bold hover:underline"
          >
            ← {t('back')}
          </Link>
        </div>
      </div>
    </main>
  );
}
