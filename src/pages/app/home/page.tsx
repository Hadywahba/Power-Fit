import LocaleSwitcher from "@/components/shared/locale-switcher";
import { LogoutButton } from "@/components/shared/logout-button";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "use-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <section className="flex flex-col justify-center items-center dark:bg-gray-800 h-screen">
      <h1> {t("hello-react")}</h1>
      <p>{t("react-number-is", { price: 2454 })}</p>
      <div className="flex gap-3 mt-3 w-full">
        <LocaleSwitcher />
        <ThemeToggle />
        <LogoutButton />

        <Button type="submit" serverError="invalid credinial"> click</Button>
        <div  className="w-full">
          <Input  type="password" label="password"/>
          <Input label="first name"/>
          <Input  type="password" label="last name"/>
        </div>
      </div>
    </section>
  );
}
