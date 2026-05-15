import { ShieldAlert } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import PageHero from '@/components/shared/page-hero';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  const sections = [
    { titleKey: 'section1-title', bodyKey: 'section1-body' },
    { titleKey: 'section2-title', bodyKey: 'section2-body' },
    { titleKey: 'section3-title', bodyKey: 'section3-body' },
    { titleKey: 'section4-title', bodyKey: 'section4-body' },
    { titleKey: 'section5-title', bodyKey: 'section5-body' },
  ] as const;

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      {/* Hero */}
      <PageHero
        badge={t('Privacy-title')}
        backgroundText={t('title')}
        icon={<ShieldAlert size={20} />}
        className="pt-8 pb-6 sm:pt-10"
        titleClassName="max-w-190 text-[30px] leading-[1.22] text-white sm:text-[42px]"
      />
      <div className="relative overflow-hidden bg-zinc-900 px-6 py-16 text-white sm:px-10">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="bg-main flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <ShieldAlert size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-wide uppercase sm:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">{t('last-updated')}</p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
            {t('intro')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-10">
        <div className="space-y-10">
          {sections.map(({ titleKey, bodyKey }, i) => (
            <section key={titleKey} className="flex gap-5">
              <div className="bg-main/10 text-main flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black">
                {i + 1}
              </div>
              <div>
                <h2 className="mb-2 text-lg font-black tracking-wide text-zinc-900 uppercase dark:text-white">
                  {t(titleKey)}
                </h2>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(bodyKey)}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Contact box */}
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-2 font-black tracking-wide text-zinc-900 uppercase dark:text-white">
            {t('contact-title')}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('contact-body')}
          </p>
          <a
            href="mailto:info@gmail.com"
            className="text-main mt-3 inline-block text-sm font-bold hover:underline"
          >
            info@gmail.com
          </a>
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
