import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Level, Workout } from './main-exercises';
import PlaylistItem from './playlist-item';

interface ExercisesPlaylistProps {
  levels: readonly Level[];
  levelTabActiveClass: Record<Level, string>;
  activeLevel: Level;
  onLevelChange: (level: Level) => void;
  list: Workout[];
  activeVideoId: number;
  onSelectVideo: (item: Workout) => void;
}

export default function ExercisesPlaylist({
  levels,
  levelTabActiveClass,
  activeLevel,
  onLevelChange,
  list,
  activeVideoId,
  onSelectVideo,
}: ExercisesPlaylistProps) {
  return (
    <aside className="flex w-[360px] flex-shrink-0 flex-col overflow-hidden border-r border-zinc-800/60 bg-zinc-900">
      <div className="flex gap-1 px-4 pt-3.5">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onLevelChange(level)}
            className={cn(
              'flex-1 rounded-t-lg border-b-2 py-2 text-[11px] font-black tracking-[0.1em] uppercase transition-all duration-200',
              level === activeLevel
                ? levelTabActiveClass[level]
                : 'border-b-transparent bg-zinc-800/50 text-zinc-600 hover:text-zinc-300',
            )}
          >
            {level}
          </button>
        ))}
      </div>

      <Separator className="mx-4 bg-zinc-800" />

      <ScrollArea className="flex-1">
        <div className="py-2">
          {list.map((item) => (
            <PlaylistItem
              key={item.id}
              item={item}
              isActive={activeVideoId === item.id}
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
