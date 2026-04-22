import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "use-intl";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import EmailStepOne from "./email-step-one";
import VerifyOtpStepTwo from "./verify-otp-step-two";
import NewPasswordStepThree from "./new-password-step-three";
import type {
  ForgetPasswordStep,
  ForgetPasswordStepsMap,
} from "@/lib/types/forget-password";

const STEPS = {
  EMAIL: "EMAIL",
  OTP: "OTP",
  NEW_PASSWORD: "NEW_PASSWORD",
} as const;

export default function ForgetPasswordLayout() {
  // Translations
  const t = useTranslations();
  // Navigation
  const navigate = useNavigate();
  // States
  const [step, setStep] = useState<ForgetPasswordStep>(STEPS.EMAIL);
  const [currentEmail, setCurrentEmail] = useState("");

  // Functions
  function handleGoBack() {
    if (step === STEPS.EMAIL)
      navigate(`${ROUTES.auth.root}/${ROUTES.auth.login}`);
    else if (step === STEPS.OTP) setStep(STEPS.EMAIL);
    else setStep(STEPS.OTP);
  }

  const steps: ForgetPasswordStepsMap = {
    [STEPS.EMAIL]: {
      title: t("forget-password.title"),
      component: (
        <EmailStepOne
          onSetStep={setStep}
          onSetCurrentEmail={setCurrentEmail}
          currentEmail={currentEmail}
        />
      ),
    },
    [STEPS.OTP]: {
      title: t("forget-password.otp-title"),
      component: (
        <VerifyOtpStepTwo onSetStep={setStep} currentEmail={currentEmail} />
      ),
    },
    [STEPS.NEW_PASSWORD]: {
      title: t("forget-password.new-password-title"),
      component: <NewPasswordStepThree currentEmail={currentEmail} />,
    },
  };

  return (
    <section className="bg-gray-800 min-h-screen">
      {/* Back button */}
      <button
        type="button"
        onClick={handleGoBack}
        aria-label={t("common.go-back")}
        className="flex items-center cursor-pointer gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft size={16} />
        <span>
          {step === STEPS.EMAIL ? t("common.back-to-login") : t("common.back")}
        </span>
      </button>

      {/* Title */}
      <h1 className="text-center my-3 text-white font-extrabold text-3xl capitalize">
        {steps[step].title}
      </h1>

      {step === STEPS.OTP && (
        // change-email button
        <p className="text-center text-sm text-zinc-400 mb-4">
          {t.rich("forget-password.otp-subtitle", {
            email: currentEmail,
            button: (chunks) => (
              <button
                type="button"
                onClick={() => setStep(STEPS.EMAIL)}
                className="font-semibold text-main underline cursor-pointer"
              >
                {chunks}
              </button>
            ),
          })}
        </p>
      )}
      {step === STEPS.NEW_PASSWORD && (
        <p className="text-center text-sm text-zinc-400 mb-4">
          {t("forget-password.new-password-card-label")}
        </p>
      )}

      <section className="p-8 border rounded-3xl md:w-[80%] mx-auto border-white">
        {/* Active step */}
        <main>{steps[step].component}</main>
      </section>
    </section>
  );
}
