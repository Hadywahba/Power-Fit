import { cn } from '@/lib/utils/tailwind-merge/cn';

interface CommonCardProps {
  image: string;
  alt: string;
  title: string;
  text: string;
  icon: string;
  goto?: () => void;
  href?: string;
  className?: string;
}
export default function CommonCard({
  title,
  text,
  icon,
  image,
  alt,
  goto,
  href,
  className,
}: CommonCardProps) {
  const actionClassName =
    'flex w-fit cursor-pointer items-center justify-start gap-2';

  const actionContent = (
    <>
      <p className="text-main text-base leading-4 font-semibold capitalize sm:text-lg">
        {text}
      </p>

      <span className="bg-main flex size-6 items-center justify-center rounded-full">
        <img src={icon} alt="" aria-hidden="true" className="size-2" />
      </span>
    </>
  );

  return (
    <article
      className={cn(
        'relative h-full overflow-hidden rounded-xl border border-white/15 bg-white/5',
        className,
      )}
    >
      <figure className="relative h-full">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />

        <figcaption className="absolute inset-x-0 bottom-0 bg-white/70 p-4 text-black backdrop-blur-xl dark:bg-black/45 dark:text-white">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-extrabold tracking-[0.06em] uppercase sm:text-lg">
              {title}
            </h3>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={actionClassName}
              >
                {actionContent}
              </a>
            ) : (
              <button type="button" onClick={goto} className={actionClassName}>
                {actionContent}
              </button>
            )}
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
