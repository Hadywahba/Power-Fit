'use client';

import { Separator } from '@/components/ui/separator';
import { featureItems } from '@/lib/constants/exercises/exercises.constant';
import type { Level as ApiLevel, Exercise } from '@/lib/types/exercises';
import { useEffect, useMemo, useState } from 'react';
import ExercisesPlaylist from './exercises-playlist';
import VideoInfo from './video-info';
import VideoPlayer from './video-player';

export interface LevelTab {
  id: string;
  name: string;
}

// get YouTube video ID
function getYouTubeId(url: string | null | undefined) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

// get YouTube embed URL
function getYouTubeEmbed(url: string | null | undefined) {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=0` : null;
}

// get YouTube thumbnail
function getYouTubeThumbnail(url: string | null | undefined) {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// Features bar
function FeaturesBar() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {featureItems.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500">
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[11px] font-bold tracking-wide text-zinc-500 uppercase">
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!activeLevelId && levels.length > 0) {
      onLevelChange(levels[0]._id);
    }
  }, [levels, activeLevelId, onLevelChange]);

  const mappedLevels = useMemo(
    () => levels.map((level) => ({ id: level._id, name: level.name })),
    [levels],
  );

  // derived state
  const activeVideo = useMemo(() => {
    if (!exercises.length) return null;
    return exercises.find((e) => e._id === selectedId) || exercises[0];
  }, [exercises, selectedId]);

return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
    <div className="flex items-start">
      
      {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-80 shrink-0 border-r border-zinc-800">
          <ExercisesPlaylist
            getYouTubeThumbnail={getYouTubeThumbnail}
            levels={mappedLevels}
            activeLevelId={activeLevelId}
            onLevelChange={onLevelChange}
            list={exercises}
            activeVideoId={activeVideo?._id ?? ''}
            onSelectVideo={(item) => {
              setSelectedId(item._id);
              setIsPlaying(false);
            }}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col gap-5 py-4 max-w-5xl mx-auto">
            {isLoading || !activeVideo ? (
              <div className="flex min-h-100 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/40 text-zinc-400">
                {isLoading ? 'Loading exercises...' : 'No exercises found'}
              </div>
            ) : (
              <>
                <VideoPlayer
                  getYouTubeEmbed={getYouTubeEmbed}
                  getYouTubeThumbnail={getYouTubeThumbnail}
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
        </main>
      </div>
    </div>
  );
}

