import { useTranslations } from "use-intl";
import { ShieldCheck } from "lucide-react";
import { profileSettingCardCn } from "./profile-setting-classes";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes/routes.constant";

export function SecurityCard({ className }: { className?: string }) {
  const t = useTranslations();

  return (
    <Link
      to={ROUTES.app.security}
      className={profileSettingCardCn(className)}
    >
      <ShieldCheck size={32} className="text-main" aria-hidden />
      <span className="text-center text-lg font-bold text-charcoal dark:text-white">
        {t("security")}
      </span>
    </Link>
  );
}
