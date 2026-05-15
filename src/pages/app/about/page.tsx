
import { useTranslations } from "use-intl";
import { ArrowUpRight, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes/routes.constant";

const featureKeys = [
  { titleKey: "about-feature-trainer-title",   descKey: "about-feature-trainer-desc" },
  { titleKey: "about-feature-cardio-title",    descKey: "about-feature-cardio-desc" },
  { titleKey: "about-feature-equipment-title", descKey: "about-feature-equipment-desc" },
  { titleKey: "about-feature-nutrition-title", descKey: "about-feature-nutrition-desc" },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#1a1a1a] py-12 sm:py-16">
      {/* Background watermark — hidden on small screens */}
      <img
        src="/assets/images/WOrkouts.svg"
        alt=""
        aria-hidden="true"
        className="absolute select-none pointer-events-none top-[100px] start-[730px] z-0 w-[332px] hidden lg:block"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Two-column on lg+, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── Image collage — responsive */}
          <div className="relative w-full">
            {/* Mobile: simple stacked images */}
            <div className="flex flex-col gap-4 lg:hidden">
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                <img
                  src="/assets/images/about-athlete-training.png"
                  alt="Athlete training"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl shadow-xl aspect-square">
                  <img
                    src="/assets/images/about-athlete-seated.png"
                    alt="Athlete seated"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-xl aspect-square">
                  <img
                    src="/assets/images/about-athlete-standing.png"
                    alt="Athlete standing"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Desktop: original absolute layout */}
            <div className="hidden lg:block relative h-[740px]">
              <div className="absolute top-0 start-0 w-[358px] h-[542px] overflow-hidden shadow-xl rounded-[18px]">
                <img
                  src="/assets/images/about-athlete-training.png"
                  alt="Athlete training"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute overflow-hidden shadow-xl border-4 border-white dark:border-[#1a1a1a] w-[222px] h-[188px] top-[80px] start-[378px] rounded-[18px]">
                <img
                  src="/assets/images/about-athlete-seated.png"
                  alt="Athlete seated"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute bottom-0 end-0 w-[353px] h-[452px] overflow-hidden shadow-xl border-4 border-white dark:border-[#1a1a1a] rounded-[18px]">
                <img
                  src="/assets/images/about-athlete-standing.png"
                  alt="Athlete standing"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ── Text content */}
          <div className="flex flex-col gap-8 z-10">
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <Dumbbell size={20} className="text-main" />
              <span className="text-main font-semibold text-base uppercase tracking-widest">
                {t("about-badge")}
              </span>
            </div>

            {/* Heading */}
            <h3
              className="text-3xl sm:text-[38px] font-bold leading-[120%] text-charcoal dark:text-white uppercase"
              style={{ fontFamily: "'Baloo Thambi 2', sans-serif" }}
            >
              {t("about-heading-1")}
              <br />
              <span className="text-main">{t("about-heading-2")}</span>{" "}
              <span>{t("about-heading-3")}</span>
            </h3>

            {/* Description */}
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
              {t("about-description")}
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-b border-gray-200 dark:border-white/10 py-6">
              {featureKeys.map(({ titleKey, descKey }) => (
                <div key={titleKey} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowUpRight size={18} className="text-main shrink-0" />
                    <span className="font-bold text-sm text-charcoal dark:text-white">
                      {t(titleKey)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed ps-6">
                    {t(descKey)}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA button — linked to classes */}
            <div className="relative w-fit">
              <Link
                to={ROUTES.app.classes}
                className="relative flex items-center bg-[#FF3C00] hover:bg-[#e63600] transition-colors text-white font-bold text-base ps-8 pe-12 py-3 rounded-full shadow-lg min-w-[170px] h-[48px]"
              >
                {t("about-cta")}
                <span
                  className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-1/3 flex items-center justify-center w-9 h-9 rounded-full border-2 border-white bg-[#FF3C00] shadow"
                >
                  <ArrowUpRight size={20} className="text-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
