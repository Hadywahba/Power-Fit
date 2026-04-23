import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import MuscleCard from '@/components/features/muscle/muscle-card';
import type { Muscle } from '@/lib/types/muscle';

interface ExercisesCarouselProps {
  pages: Muscle[][];
  cardBasePath: string;
}

export default function ExercisesCarousel({
  pages,
  cardBasePath,
}: ExercisesCarouselProps) {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      opts={{ align: 'start', containScroll: 'trimSnaps', loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {pages.flat().map((muscle) => (
          <CarouselItem key={muscle._id} className="basis-1/4 ">
            <MuscleCard muscle={muscle} to={`${cardBasePath}/${muscle._id}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
