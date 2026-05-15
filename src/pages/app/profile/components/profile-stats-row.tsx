import { useFormatter, useTranslations } from 'use-intl';
import { useProfile } from '../hooks/use-profile';
import ListError from '@/components/error/list-error';
import { StatPill } from './user-profile';
import { UserRound, Camera } from 'lucide-react';
import { useRef } from 'react';
import { useUploadProfile } from '../hooks/use-upload-profile';

export default function ProfileStatsRow() {
  const t = useTranslations();
  const format = useFormatter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, isLoading, error } = useProfile();
  const { uploadProfile } = useUploadProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-30 items-center justify-center py-8">
        <div className="border-main size-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const weightLabel = `${format.number(user.weight)} ${t('kg')}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    uploadProfile(formData);
  };

  return (
    <ListError errors={error}>
      {/* ── Avatar + name banner ── */}
      <div className="flex flex-col items-center gap-3 px-4 pt-10 pb-2">
        {/* Avatar — clickable */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile photo"
          className="group ring-main relative size-40 overflow-hidden rounded-full ring-4 ring-offset-2 ring-offset-white focus:outline-none focus-visible:ring-offset-4 dark:ring-offset-zinc-900"
        >
          {/* Photo or fallback */}
          {user.photo ? (
            <img
              src={user.photo}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-60"
            />
          ) : (
            <div className="bg-main flex h-full w-full items-center justify-center transition-opacity duration-200 group-hover:opacity-60">
              <UserRound className="size-10 text-white" />
            </div>
          )}

          {/* Camera overlay on hover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Camera className="size-6 text-white" />
            <span className="text-[10px] font-bold tracking-wide text-white uppercase">
              Edit
            </span>
          </div>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Name + email */}
        <div className="text-center">
          <h1 className="text-charcoal text-xl font-black dark:text-white">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* ── Stats row ── */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-6 pb-6 md:px-6 md:pb-8">
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-3 md:gap-8">
          {/* Goal */}
          <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
            <h2 className="text-charcoal text-center text-2xl font-bold dark:text-white">
              {t('profile-page.your-goal')}
            </h2>
            <StatPill label={user.goal} />
          </div>

          {/* Activity Level */}
          <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
            <h2 className="text-charcoal text-center text-2xl font-bold dark:text-white">
              {t('profile-page.level')}
            </h2>
            <StatPill label={user.activityLevel} />
          </div>

          {/* Weight */}
          <div className="flex flex-col items-center gap-2 text-center md:items-stretch md:text-left">
            <h2 className="text-charcoal text-center text-2xl font-bold dark:text-white">
              {t('weight')}
            </h2>
            <StatPill label={weightLabel} />
          </div>
        </div>
      </section>
    </ListError>
  );
}
