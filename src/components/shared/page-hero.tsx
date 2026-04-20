import { Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge/cn";

type PageHeroProps = {
  badge: string;
  titleStart: string;
  titleHighlight: string;
  backgroundText?: string;
  className?: string;
};

export default function PageHero({
  badge,
  titleStart,
  titleHighlight,
  backgroundText = "WORKOUTS",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        "py-10 sm:py-12 lg:py-14",
        className,
      )}
    >
      {/* ─── Background Word ─── */}
      <div
        aria-hidden="true"
        className={cn(
          " absolute left-1/2 top-2 -translate-x-1/2",
          "font-extrabold uppercase tracking-[0.14em]",
          "text-[48px] sm:text-[64px] lg:text-[74px]",
          "text-transparent",
          "[-webkit-text-stroke:1px_rgba(0,0,0,0.08)]",
          "dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.08)]",
        )}
      >
        {backgroundText}
      </div>

      {/*gradient behind title */}

      <div
        aria-hidden="true"
        className={cn(
          "absolute w-full h-[70%] bottom-0 e-0",
          "bg-linear-to-r from-foreground/3 via-transparent to-foreground/3",
          "dark:from-white/2 dark:to-white/2",
        )}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* ─── Badge ─── */}
        <div className="relative mb-6">
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-full blur-xl",
              "bg-main/20 dark:bg-main/25",
            )}
          />

          <div
            className={cn(
              "relative inline-flex items-center gap-2 rounded-full px-4 py-2",
              " text-lg font-semibold text-main",
            )}
          >
            <Dumbbell />
            <span>{badge}</span>
          </div>
        </div>

        {/* ─── Title ─── */}
        <h1
          className={cn(
            "max-w-195 text-center font-extrabold uppercase text-foreground",
            "text-[28px] leading-[1.4]",
            "tracking-[0.02em]",
          )}
        >
          <span>{titleStart} </span>
          <span className="text-main">{titleHighlight}</span>
        </h1>
      </div>
    </section>
  );
}
