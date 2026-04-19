import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { slides } from '@/lib/constants/home/hero.constants';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Star } from 'lucide-react';

const looped = [...slides, ...slides];

export default function HeroCarousel() {
  return (
    <Carousel
      opts={{ align: 'start', loop: true, dragFree: true }}
      plugins={[AutoScroll({ speed: 1, stopOnInteraction: false })]}
      className="overflow-hidden"
    >
      <CarouselContent className="-ml-0 gap-0">
        {looped.map((slide, i) => (
          <CarouselItem key={i} className="basis-auto pl-0">
            <div className="bg-main -mr-px flex h-20 flex-row items-center gap-16 px-7">
              <h3 className="text-xl font-bold tracking-wide whitespace-nowrap text-white uppercase">
                {slide.title}
              </h3>
              <Star size={14} className="shrink-0 fill-white text-white" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
