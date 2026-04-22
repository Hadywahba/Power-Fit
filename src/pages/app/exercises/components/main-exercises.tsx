'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Play,
  Pause,
  Timer,
  Flame,
  ClipboardList,
  Star,
  BarChart2,
  Video,
} from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import ExercisesPlaylist from './exercises-playlist';
import type { Exercise, Level as ApiLevel } from '@/lib/types/exercises';

export interface LevelTab {
  id: string;
  name: string;
}

const levelBadgeClass = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Novice: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
} as const;

const levelTabActiveClass = {
  Beginner: 'border-b-emerald-400 text-emerald-400 bg-emerald-500/10',
  Intermediate: 'border-b-amber-400 text-amber-400 bg-amber-500/10',
  Novice: 'border-b-orange-400 text-orange-400 bg-orange-500/10',
  Advanced: 'border-b-red-400 text-red-400 bg-red-500/10',
} as const;

const getLevelClass = (levelName: string) =>
  levelBadgeClass[levelName as keyof typeof levelBadgeClass] ??
  'bg-zinc-700/20 text-zinc-300 border-zinc-700';

function VideoPlayer({
  exercise,
  isPlaying,
  onToggle,
}: {
  exercise: Exercise;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="group relative aspect-video max-h-96 w-full cursor-pointer overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <span className="px-6 text-center text-3xl font-black tracking-wide text-zinc-700 uppercase">
          {exercise.exercise}
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-t from-black/80 via-transparent to-transparent">
        <div className="relative mb-4">
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/90',
              'shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-200',
              'group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]',
            )}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-white text-white" />
            ) : (
              <Play className="ml-1 h-6 w-6 fill-white text-white" />
            )}
          </div>
          {isPlaying && (
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-orange-500" />
          )}
        </div>

        <h2 className="text-2xl font-black tracking-wider text-white uppercase drop-shadow-lg">
          {exercise.exercise}
        </h2>
      </div>
    </div>
  );
}

function VideoInfo({ exercise }: { exercise: Exercise }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-black tracking-wide text-zinc-100 uppercase">
        {exercise.exercise}
      </h3>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={cn(
            'text-xs font-bold tracking-widest uppercase',
            getLevelClass(exercise.difficulty_level),
          )}
        >
          {exercise.difficulty_level}
        </Badge>
        <Badge
          variant="outline"
          className="border-zinc-700 text-xs font-bold tracking-widest text-zinc-400 uppercase"
        >
          {exercise.target_muscle_group}
        </Badge>
        <Badge
          variant="outline"
          className="border-zinc-700 text-xs font-bold tracking-widest text-zinc-400 uppercase"
        >
          {exercise.mechanics}
        </Badge>
      </div>

      <p className="text-sm leading-relaxed text-zinc-500">
        A targeted {exercise.target_muscle_group?.toLowerCase()} workout.{' '}
        {exercise.movement_pattern_1}. Follow along at your own pace and focus
        on proper form throughout every rep.
      </p>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300">
          <Timer className="h-4 w-4 text-zinc-500" />
          N/A
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-500/40 px-4 py-2 text-sm font-bold text-orange-400">
          <Flame className="h-4 w-4" />
          N/A
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300">
          <ClipboardList className="h-4 w-4 text-zinc-500" />
          {exercise.primary_exercise_classification}
        </div>
      </div>
    </div>
  );
}

const featureItems = [
  { icon: Star, label: 'Expert-designed workout' },
  { icon: BarChart2, label: 'Track your progress' },
  { icon: Video, label: 'HD Video quality' },
] as const;

function FeaturesBar() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {featureItems.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500">
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[11px] leading-tight font-bold tracking-wide text-zinc-500 uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

interface MainExercisesProps {
  levels: ApiLevel[];
  activeLevelId: string;
  onLevelChange: (levelId: string) => void;
  exercises: Exercise[];
  isLoading: boolean;
}

export default function MainExercises({
  levels,
  activeLevelId,
  onLevelChange,
  exercises,
  isLoading,
}: MainExercisesProps) {
  const [activeVideo, setActiveVideo] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mappedLevels = useMemo<LevelTab[]>(
    () => levels.map((level) => ({ id: level._id, name: level.name })),
    [levels],
  );

  useEffect(() => {
    if (exercises.length === 0) {
      setActiveVideo(null);
      return;
    }

    const stillExists = activeVideo
      ? exercises.some((item) => item._id === activeVideo._id)
      : false;

    if (!stillExists) {
      setActiveVideo(exercises[0]);
      setIsPlaying(false);
    }
  }, [exercises, activeVideo]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="flex flex-1 overflow-hidden">
        <ExercisesPlaylist
          levels={mappedLevels}
          levelTabActiveClass={levelTabActiveClass}
          activeLevelId={activeLevelId}
          onLevelChange={onLevelChange}
          list={exercises}
          activeVideoId={activeVideo?._id ?? ''}
          onSelectVideo={(item) => {
            setActiveVideo(item);
            setIsPlaying(false);
          }}
        />

        <ScrollArea className="flex-1 bg-zinc-950">
          <div className="flex flex-col gap-5 p-6">
            {isLoading || !activeVideo ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 text-zinc-400">
                {isLoading ? 'Loading exercises...' : 'No exercises found'}
              </div>
            ) : (
              <>
                <VideoPlayer
                  exercise={activeVideo}
                  isPlaying={isPlaying}
                  onToggle={() => setIsPlaying((p) => !p)}
                />
                <VideoInfo exercise={activeVideo} />
              </>
            )}

            <Separator className="bg-zinc-800/60" />
            <FeaturesBar />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
