import { LifeBuoy, ChevronDown } from 'lucide-react';
import { useTranslations } from 'use-intl';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import PageHero from '@/components/shared/page-hero';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-bold text-zinc-900 dark:text-white">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-zinc-500 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function HelpPage() {
  const t = useTranslations('help-page');

  const faqs = [
    { qKey: 'faq1-q', aKey: 'faq1-a' },
    { qKey: 'faq2-q', aKey: 'faq2-a' },
    { qKey: 'faq3-q', aKey: 'faq3-a' },
    { qKey: 'faq4-q', aKey: 'faq4-a' },
    { qKey: 'faq5-q', aKey: 'faq5-a' },
  ] as const;

  const topics = [
    { emoji: '🏋️', titleKey: 'topic1-title', bodyKey: 'topic1-body' },
    { emoji: '🥗', titleKey: 'topic2-title', bodyKey: 'topic2-body' },
    { emoji: '👤', titleKey: 'topic3-title', bodyKey: 'topic3-body' },
    { emoji: '🔒', titleKey: 'topic4-title', bodyKey: 'topic4-body' },
  ] as const;

  return (
    <main className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      {/* Hero */}
      <PageHero
        badge={t('help-title')}
        backgroundText={t('title')}
        icon={<LifeBuoy size={20} />}
        className="pt-8 pb-6 sm:pt-10"
        titleClassName="max-w-190 text-[30px] leading-[1.22] text-white sm:text-[42px]"
      />
      <div className="relative overflow-hidden bg-zinc-900 px-6 py-16 text-white sm:px-10">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="bg-main flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
              <LifeBuoy size={22} className="text-white" />
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
      <div className="mx-auto max-w-4xl space-y-14 px-6 py-12 sm:px-10">
        {/* Topics grid */}
        <section>
          <h2 className="mb-6 text-xl font-black tracking-wide text-zinc-900 uppercase dark:text-white">
            {t('topics-heading')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {topics.map(({ emoji, titleKey, bodyKey }) => (
              <div
                key={titleKey}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-2xl">{emoji}</span>
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
        </section>

        {/* FAQ accordion */}
        <section>
          <h2 className="mb-6 text-xl font-black tracking-wide text-zinc-900 uppercase dark:text-white">
            {t('faq-heading')}
          </h2>
          <div className="rounded-2xl border border-zinc-200 px-6 dark:border-white/10">
            {faqs.map(({ qKey, aKey }) => (
              <FaqItem key={qKey} question={t(qKey)} answer={t(aKey)} />
            ))}
          </div>
        </section>

        {/* Contact support */}
        <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-2 font-black tracking-wide text-zinc-900 uppercase dark:text-white">
            {t('contact-title')}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('contact-body')}
          </p>
          <a
            href="mailto:info@gmail.com"
            className="bg-main hover:bg-main/90 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition"
          >
            {t('contact-btn')}
          </a>
        </section>

        <div>
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
