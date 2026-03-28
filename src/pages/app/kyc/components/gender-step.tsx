import { Mars, Venus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/tailwind-merge/cn";

export type GenderOption = "male" | "female";

type GenderItem = {
  value: GenderOption;
  label: string;
  icon: ReactNode;
};

type GenderStepProps = {
  value: GenderOption | null;
  onChange: (value: GenderOption) => void;
  options?: GenderItem[];
};

const DEFAULT_OPTIONS: GenderItem[] = [
  {
    value: "male",
    label: "Male",
    icon: <Mars className="h-9 w-9" strokeWidth={1.9} />,
  },
  {
    value: "female",
    label: "Female",
    icon: <Venus className="h-9 w-9" strokeWidth={1.9} />,
  },
];

export default function GenderStep({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}: GenderStepProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {options.map((item) => (
        <GenderOptionButton
          key={item.value}
          label={item.label}
          icon={item.icon}
          selected={value === item.value}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  );
}

function GenderOptionButton({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-28 w-28 p-2 flex-col items-center justify-center rounded-full border transition-all duration-200",
        selected
          ? "border-main bg-main/18 text-white shadow-[0_0_2.4rem_rgba(255,65,0,0.22)]"
          : "border-white/55 bg-white/2 text-white/90 hover:border-white/85",
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "transition-transform duration-200",
          selected && "scale-110 text-main",
        )}
      >
        {icon}
      </span>
      <span className="mt-2 text-lg font-bold tracking-wide">{label}</span>
    </button>
  );
}
