import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Play } from 'lucide-react';
import type { Workout } from './main-exercises';

interface PlaylistItemProps {
  item: Workout;
  isActive: boolean;
  onSelect: (item: Workout) => void;
}

export default function PlaylistItem({
  item,
  isActive,
  onSelect,
}: PlaylistItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={cn(
        'flex w-full items-center gap-3 border-l-[3px] px-4 py-3 text-left transition-all duration-150 hover:bg-white/5',
        isActive
          ? 'border-l-main bg-orange-500/10'
          : 'border-l-transparent',
      )}
    >

      <div className="relative flex h-13 w-18 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-zinc-700 to-zinc-600 text-2xl">
        <span className="select-none" aria-hidden>
          {item.emoji}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-orange-500/10 to-transparent" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-0.5 truncate text-sm leading-tight font-bold tracking-wide text-zinc-100">
          {item.title}
        </p>
        <p className="mb-0.5 text-[11px] text-zinc-400">{item.sets}</p>
        <p className="truncate text-[11px] text-zinc-600">{item.desc}</p>
      </div>

      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-main shadow-lg transition-all duration-200',
          isActive && 'scale-110 shadow-orange-500/40',
        )}
      >
        <Play className="ml-0.5 h-3 w-3 fill-zinc-800 text-zinc-800" />
      </div>
    </button>
  );
}
