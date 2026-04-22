'use client';

import { useState } from 'react';
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
import type { Exercise } from '@/lib/types/exercises';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Workout {
  id: number;
  title: string;
  sets: string;
  meta: string;
  desc: string;
  duration: string;
  cal: string;
  category: string;
  emoji: string;
}

type WorkoutMap = Record<Level, Workout[]>;

// ─── Data ─────────────────────────────────────────────────────────────────────

const workouts: WorkoutMap = {
  Beginner: [
    {
      id: 1,
      title: 'Bench Press Basics',
      sets: '3 Sets × 12 Reps',
      meta: 'Chest Compound',
      desc: 'Master the fundamental push movement',
      duration: '25 MIN',
      cal: '110 Cal',
      category: 'Chest',
      emoji: '🏋️',
    },
    {
      id: 2,
      title: 'Incline Dumbbell',
      sets: '3 Sets × 15 Reps',
      meta: 'Upper Chest',
      desc: 'Build the upper chest shelf',
      duration: '20 MIN',
      cal: '95 Cal',
      category: 'Chest',
      emoji: '💪',
    },
    {
      id: 3,
      title: 'Cable Fly',
      sets: '3 Sets × 15 Reps',
      meta: 'Chest Isolation',
      desc: 'Feel the stretch and squeeze',
      duration: '15 MIN',
      cal: '80 Cal',
      category: 'Chest',
      emoji: '🔥',
    },
    {
      id: 4,
      title: 'Push-Up Variations',
      sets: '4 Sets × 20 Reps',
      meta: 'Bodyweight',
      desc: 'Foundation of chest training',
      duration: '18 MIN',
      cal: '90 Cal',
      category: 'Chest',
      emoji: '💥',
    },
    {
      id: 5,
      title: 'Chest Dips',
      sets: '3 Sets × 10 Reps',
      meta: 'Lower Chest',
      desc: 'Carve the lower pec line',
      duration: '20 MIN',
      cal: '100 Cal',
      category: 'Chest',
      emoji: '⚡',
    },
  ],
  Intermediate: [
    {
      id: 6,
      title: 'Barbell Bench Press',
      sets: '4 Sets × 10 Reps',
      meta: 'Power Builder',
      desc: 'Add serious mass to your chest',
      duration: '30 MIN',
      cal: '145 Cal',
      category: 'Chest',
      emoji: '🏆',
    },
    {
      id: 7,
      title: 'Decline Press',
      sets: '4 Sets × 12 Reps',
      meta: 'Lower Chest',
      desc: 'Target the lower pec fibers',
      duration: '25 MIN',
      cal: '130 Cal',
      category: 'Chest',
      emoji: '🎯',
    },
    {
      id: 8,
      title: 'Dumbbell Pullover',
      sets: '3 Sets × 12 Reps',
      meta: 'Chest & Serratus',
      desc: 'Expand your rib cage',
      duration: '20 MIN',
      cal: '115 Cal',
      category: 'Chest',
      emoji: '🔱',
    },
    {
      id: 9,
      title: 'Pec Deck Machine',
      sets: '4 Sets × 15 Reps',
      meta: 'Chest Isolation',
      desc: 'Pump and define your pecs',
      duration: '22 MIN',
      cal: '120 Cal',
      category: 'Chest',
      emoji: '⚙️',
    },
    {
      id: 10,
      title: 'Close Grip Bench',
      sets: '3 Sets × 10 Reps',
      meta: 'Tricep Focus',
      desc: 'Inner chest and tricep combo',
      duration: '28 MIN',
      cal: '135 Cal',
      category: 'Chest',
      emoji: '💎',
    },
  ],
  Advanced: [
    {
      id: 11,
      title: 'Heavy 1RM Protocol',
      sets: '5 Sets × 3 Reps',
      meta: 'Strength Focus',
      desc: 'Max out your pressing power',
      duration: '45 MIN',
      cal: '200 Cal',
      category: 'Chest',
      emoji: '👑',
    },
    {
      id: 12,
      title: 'Superset Chest Blast',
      sets: '4 Sets × Failure',
      meta: 'Hypertrophy',
      desc: 'Non-stop chest annihilation',
      duration: '40 MIN',
      cal: '185 Cal',
      category: 'Chest',
      emoji: '🔥',
    },
    {
      id: 13,
      title: 'Giant Set Circuit',
      sets: '3 Sets × 4 Exercises',
      meta: 'Volume',
      desc: 'Chest from every angle',
      duration: '50 MIN',
      cal: '220 Cal',
      category: 'Chest',
      emoji: '⚔️',
    },
    {
      id: 14,
      title: 'Plyometric Push-Ups',
      sets: '5 Sets × 12 Reps',
      meta: 'Power & Speed',
      desc: 'Explosive chest development',
      duration: '30 MIN',
      cal: '170 Cal',
      category: 'Chest',
      emoji: '💣',
    },
    {
      id: 15,
      title: 'Drop Set Finisher',
      sets: '3 Sets × Drop × 3',
      meta: 'Intensity Technique',
      desc: 'Push past your limits',
      duration: '35 MIN',
      cal: '180 Cal',
      category: 'Chest',
      emoji: '🌋',
    },
  ],
};

const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

const levelBadgeClass: Record<Level, string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/10  text-amber-400  border-amber-500/30',
  Advanced: 'bg-red-500/10    text-red-400    border-red-500/30',
};

const levelTabActiveClass: Record<Level, string> = {
  Beginner: 'border-b-emerald-400 text-emerald-400 bg-emerald-500/10',
  Intermediate: 'border-b-amber-400  text-amber-400  bg-amber-500/10',
  Advanced: 'border-b-red-400    text-red-400    bg-red-500/10',
};

// ─── VideoPlayer ──────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  workout: Workout;
  isPlaying: boolean;
  onToggle: () => void;
}

function VideoPlayer({ workout, isPlaying, onToggle }: VideoPlayerProps) {
  return (
    <div
      onClick={onToggle}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl aspect-video max-h-96 "
    >
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <span className="text-[96px] opacity-10 select-none">
          {workout.emoji}
        </span>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-t from-black/80 via-transparent to-transparent">
        {/* Button */}
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

        {/* Title */}
        <h2 className="text-2xl font-black tracking-wider text-white uppercase drop-shadow-lg">
          {workout.title}
        </h2>
      </div>
    </div>
  );
}

// ─── VideoInfo ────────────────────────────────────────────────────────────────

interface VideoInfoProps {
  workout: Workout;
  level: Level;
}

function VideoInfo({ workout, level }: VideoInfoProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-black tracking-wide text-zinc-100 uppercase">
        {workout.title}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={cn(
            'text-xs font-bold tracking-widest uppercase',
            levelBadgeClass[level],
          )}
        >
          {level}
        </Badge>
        <Badge
          variant="outline"
          className="border-zinc-700 text-xs font-bold tracking-widest text-zinc-400 uppercase"
        >
          {workout.category}
        </Badge>
        <Badge
          variant="outline"
          className="border-zinc-700 text-xs font-bold tracking-widest text-zinc-400 uppercase"
        >
          {workout.meta}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-500">
        A targeted {workout.category.toLowerCase()} workout designed for{' '}
        <span className="text-zinc-400">{level.toLowerCase()}</span> athletes.{' '}
        {workout.desc}. Follow along at your own pace and focus on proper form
        throughout every rep.
      </p>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300">
          <Timer className="h-4 w-4 text-zinc-500" />
          {workout.duration}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-500/40 px-4 py-2 text-sm font-bold text-orange-400">
          <Flame className="h-4 w-4" />
          {workout.cal}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-300">
          <ClipboardList className="h-4 w-4 text-zinc-500" />
          {workout.sets}
        </div>
      </div>
    </div>
  );
}

// ─── FeaturesBar ──────────────────────────────────────────────────────────────

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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MainExercises(exercises: Exercise[] | undefined) {
  const [activeLevel, setActiveLevel] = useState<Level>('Beginner');
  const [activeVideo, setActiveVideo] = useState<Workout>(workouts.Beginner[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

  const list: Workout[] = workouts[activeLevel];

  const selectVideo = (item: Workout): void => {
    setActiveVideo(item);
    setIsPlaying(false);
    setAnimKey((k) => k + 1);
  };

  const switchLevel = (level: Level): void => {
    setActiveLevel(level);
    setActiveVideo(workouts[level][0]);
    setIsPlaying(false);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
        <ExercisesPlaylist
          levels={levels}
          levelTabActiveClass={levelTabActiveClass}
          activeLevel={activeLevel}
          onLevelChange={switchLevel}
          list={list}
          activeVideoId={activeVideo.id}
          onSelectVideo={selectVideo}
        />

        {/* ── RIGHT: PLAYER ── */}
        <ScrollArea className="flex-1 bg-zinc-950">
          <div key={animKey} className="flex flex-col gap-5 p-6">
            <VideoPlayer
              workout={activeVideo}
              isPlaying={isPlaying}
              onToggle={() => setIsPlaying((p) => !p)}
            />

            <VideoInfo workout={activeVideo} level={activeLevel} />

            <Separator className="bg-zinc-800/60" />

            <FeaturesBar />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
