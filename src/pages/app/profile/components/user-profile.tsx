import { Button } from "@/components/ui/button";

export function StatPill({ label }: { label: string }) {
  return (
    <Button
      type="button"
      className="bg-main hover:bg-main/90 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-left text-sm font-bold text-white shadow-md transition"
    >
      <span className="min-w-0 truncate">{label}</span>
    </Button>
  );
}