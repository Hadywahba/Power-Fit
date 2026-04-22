import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import type { Exercise } from '@/lib/types/exercises';
import type { LevelTab } from './main-exercises';
import PlaylistItem from './playlist-item';

interface ExercisesPlaylistProps {
  levels: readonly LevelTab[];
  levelTabActiveClass: Record<string, string>;
  activeLevelId: string;
  onLevelChange: (levelId: string) => void;
  list: Exercise[];
  activeVideoId: string;
  onSelectVideo: (item: Exercise) => void;
}

export default function ExercisesPlaylist({
  levels,
  levelTabActiveClass,
  activeLevelId,
  onLevelChange,
  list,
  activeVideoId,
  onSelectVideo,
}: ExercisesPlaylistProps) {
  return (
    <aside className="flex w-90 shrink-0 flex-col overflow-hidden border-r border-zinc-800/60 bg-zinc-900">
      <div className="flex gap-1 px-4 pt-3.5">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => onLevelChange(level.id)}
            className={cn(
              'flex-1 rounded-t-lg border-b-2 py-2 text-[11px] font-black tracking-widest uppercase transition-all duration-200',
              level.id === activeLevelId
                ? (levelTabActiveClass[level.name] ??
                    'border-b-orange-400 bg-orange-500/10 text-orange-400')
                : 'border-b-transparent bg-zinc-800/50 text-zinc-600 hover:text-zinc-300',
            )}
          >
            {level.name}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          {list.map((item) => (
            <PlaylistItem
              key={item._id}
              item={item}
              isActive={activeVideoId === item._id}
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
