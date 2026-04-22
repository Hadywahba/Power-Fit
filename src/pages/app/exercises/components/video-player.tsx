import type { Exercise } from '@/lib/types/exercises';
import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Play } from 'lucide-react';


export default function VideoPlayer({
  getYouTubeEmbed,
  getYouTubeThumbnail,
  exercise,
  isPlaying,
  onToggle,
}: {
  getYouTubeEmbed: (url: string | null | undefined) => string | null;
  getYouTubeThumbnail: (url: string | null | undefined) => string | null;
  exercise: Exercise;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const embedUrl = getYouTubeEmbed(exercise.in_depth_youtube_explanation_link);

  const thumbnail = getYouTubeThumbnail(
    exercise.in_depth_youtube_explanation_link,
  );

  return (
    <div className="group relative mb-2 aspect-video max-h-134 w-full overflow-hidden rounded-2xl">
      {/* 🎥 VIDEO */}
      {embedUrl && isPlaying ? (
        <iframe
          title={exercise.exercise}
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div onClick={onToggle} className="absolute inset-0 cursor-pointer">
          {/* 🖼️ Thumbnail */}
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={exercise.exercise}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900">
              <span className="px-6 text-center text-3xl font-black tracking-wide text-zinc-700 uppercase">
                {exercise.exercise}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ▶️ Overlay */}
      {!isPlaying && (
        <div
          onClick={onToggle}
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-linear-to-t from-black/80 via-transparent to-transparent"
        >
          <div className="relative mb-4">
            <div
              className={cn(
                'bg-main/90 flex h-16 w-16 items-center justify-center rounded-full',
                'shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all duration-200',
                'group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]',
              )}
            >
              <Play className="ml-1 h-6 w-6 fill-white text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
