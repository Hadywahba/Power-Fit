import { useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind-merge/cn";
import { ROUTES } from "@/lib/constants/routes/routes.constant";
import GenderStep, { type GenderOption } from "./gender-step";
import NumberSelectionStep from "./number-selection-step";
import ProgressRing from "./progress-ring";
import SelectOptionsStep, {
  type SelectOptionItem,
} from "./select-options-step";

const TOTAL_STEPS = 6;
const LOGIN_REDIRECT_DELAY_MS = 1400;

type KycDraft = {
  gender: GenderOption | null;
  age: number;
  weight: number;
  height: number;
  goal: GoalOption | null;
  activityLevel: ActivityLevelOption | null;
};

type GoalOption =
  | "Gain weight"
  | "Lose weight"
  | "Get fitter"
  | "Gain more flexible"
  | "Learn the basic";

type ActivityLevelOption = "level1" | "level2" | "level3" | "level4" | "level5";

// Keep option values aligned with backend payload.
const GOAL_OPTIONS: SelectOptionItem<GoalOption>[] = [
  { value: "Gain weight", label: "Gain Weight" },
  { value: "Lose weight", label: "Lose Weight" },
  { value: "Get fitter", label: "Get Fitter" },
  { value: "Gain more flexible", label: "Gain More Flexible" },
  { value: "Learn the basic", label: "Learn The Basic" },
];

// Labels are user-facing, values are backend-facing (level1..level5).
const ACTIVITY_LEVEL_OPTIONS: SelectOptionItem<ActivityLevelOption>[] = [
  { value: "level1", label: "Rookie" },
  { value: "level2", label: "Beginner" },
  { value: "level3", label: "Intermediate" },
  { value: "level4", label: "Advance" },
  { value: "level5", label: "True Beast" },
];

type KycStep = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  canContinue: (draft: KycDraft) => boolean;
  content: (
    draft: KycDraft,
    setDraft: (next: Partial<KycDraft>) => void,
  ) => ReactNode;
};

const INITIAL_DRAFT: KycDraft = {
  gender: null,
  age: 25,
  weight: 90,
  height: 175,
  goal: null,
  activityLevel: null,
};

export default function KycWizard() {
  const navigate = useNavigate();
  const [draft, setDraftState] = useState<KycDraft>(INITIAL_DRAFT);
  const [stepIndex, setStepIndex] = useState(0);

  const setDraft = (next: Partial<KycDraft>) => {
    setDraftState((prev) => ({ ...prev, ...next }));
  };

  const steps: KycStep[] = [
    {
      title: "TELL US ABOUT YOURSELF!",
      subtitle: "We Need To Know Your Gender",
      buttonLabel: "Next",
      canContinue: (data) => Boolean(data.gender),
      content: (data, update) => (
        <GenderStep
          value={data.gender}
          onChange={(value) => update({ gender: value })}
        />
      ),
    },
    {
      title: "How Old Are You ?",
      subtitle: "This Helps Us Create Your Personalized Plan",
      buttonLabel: "Next",
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="age-step"
          label="Years Old"
          min={18}
          max={65}
          value={data.age}
          onChange={(value) => update({ age: value })}
        />
      ),
    },
    {
      title: "What Is Your Weight ?",
      subtitle: "This Helps Us Create Your Personalized Plan",
      buttonLabel: "Next",
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="weight-step"
          label="KG"
          min={40}
          max={150}
          value={data.weight}
          onChange={(value) => update({ weight: value })}
        />
      ),
    },
    {
      title: "What Is Your Height ?",
      subtitle: "This Helps Us Create Your Personalized Plan",
      buttonLabel: "Next",
      canContinue: () => true,
      content: (data, update) => (
        <NumberSelectionStep
          key="height-step"
          label="CM"
          min={140}
          max={220}
          value={data.height}
          onChange={(value) => update({ height: value })}
        />
      ),
    },
    {
      title: "What Is Your Goal ?",
      subtitle: "This Helps Us Create Your Personalized Plan",
      buttonLabel: "Next",
      canContinue: (data) => Boolean(data.goal),
      content: (data, update) => (
        <SelectOptionsStep
          value={data.goal}
          options={GOAL_OPTIONS}
          onChange={(value) => update({ goal: value })}
        />
      ),
    },
    {
      title: "Your Regular Physical Activity Level ?",
      subtitle: "This Helps Us Create Your Personalized Plan",
      buttonLabel: "Done",
      canContinue: (data) => Boolean(data.activityLevel),
      content: (data, update) => (
        <SelectOptionsStep
          value={data.activityLevel}
          options={ACTIVITY_LEVEL_OPTIONS}
          onChange={(value) => update({ activityLevel: value })}
        />
      ),
    },
  ];

  const currentStep = steps[stepIndex];
  const canContinue = currentStep.canContinue(draft);

  const handleNext = () => {
    if (!canContinue) {
      return;
    }

    const isLastStep = stepIndex === steps.length - 1;

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    // Show success feedback before redirecting the user to login.
    toast.success("KYC completed", {
      description: "All 6 steps are saved successfully.",
    });

    setTimeout(() => {
      navigate(`${ROUTES.auth.root}/${ROUTES.auth.login}`);
    }, LOGIN_REDIRECT_DELAY_MS);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#090d16] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.11),transparent_30%),linear-gradient(180deg,#121826_0%,#070b14_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-28 -translate-x-1/2 bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-main/15 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
        <div className="w-full">
          <ProgressRing current={stepIndex + 1} total={TOTAL_STEPS} />

          <header className="mt-4 text-center">
            <h1 className="text-[2.15rem] leading-tight uppercase font-black sm:text-[3rem]">
              {currentStep.title}
            </h1>
            <p className="mt-2 sm:text-lg">{currentStep.subtitle}</p>
          </header>

          <div className="mt-10">{currentStep.content(draft, setDraft)}</div>

          <Button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className={cn(
              "mt-6 h-12 w-full max-w-xs mx-auto flex items-center justify-center rounded-full cursor-pointer",
            )}
          >
            {currentStep.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
