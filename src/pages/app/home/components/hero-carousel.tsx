import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Star } from 'lucide-react';

const slides = [
  { id: 1, title: 'Live Classes' },
  { id: 2, title: 'Personal Trainers' },
  { id: 3, title: 'Outdoor & Online' },
  { id: 4, title: 'Personal Classes' },
];

const looped = [...slides, ...slides];

export default function HeroCarousel() {
  return (
    <Carousel
      opts={{ align: 'start', loop: true, dragFree: true }}
      plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
      className="overflow-hidden"
    >
      <CarouselContent >
        {looped.map((slide, i) => (
          <CarouselItem key={i} className="basis-auto px-0">
            <div className="flex h-20 flex-row bg-main items-center gap-16 px-7">
              <h3 className="text-xl font-bold tracking-wide whitespace-nowrap text-white uppercase">
                {slide.title}
              </h3>
              <Star
                size={14}
                className="shrink-0 text-white fill-white"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
