import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import HeroCarousel from './hero-carousel';
import { stats } from '@/lib/constants/home/hero.constants';


export default function HeroSection() {
  return (
    <>
      <section className="relative flex min-h-200 flex-col bg-white bg-[url('/assets/images/Theo_Vance.png')] bg-cover bg-bottom-right bg-no-repeat text-zinc-800 dark:bg-transparent dark:text-white">
        {/* Gradient + Blur Overlay */}
        <div className="absolute inset-0 bg-linear-to-l from-white/90 via-white/75 to-white/50 backdrop-blur-2xl dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-800/40"></div>

        {/* Hero content row */}
        <div className="relative z-10 flex flex-1 items-center px-20">
          {/* Left content */}
          <div className="max-w-[55%] flex-1 pr-8">
            <p className="mb-6 text-5xl leading-normal font-bold uppercase">
              Your body can
              <span className="text-main"> stand almost </span>
              anything.
            </p>

            <p className="before:bg-main relative mb-8 max-w-160 pl-4 text-xl font-normal text-zinc-600 before:absolute before:inset-0 before:h-24 before:w-1 before:content-[''] dark:text-white/80">
              It's your mind that needs convincing. Push past your limits, stay
              committed, and watch your body transform into a powerhouse of
              strength and resilience. Start your journey today & truly capable
              of!
            </p>

            <ul className="mb-16 flex list-none gap-12 py-5">
              {stats.map(( state ) => (
                <li key={state.id}>
                  <span className="text-2xl font-bold">{state.number}</span>
                  <span className="mt-1 block text-xl font-normal text-zinc-700 dark:text-white/90">
                    {state.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              <Button className="cursor-pointer">Get Started</Button>
              <Button
                className="text-main border-main hover:bg-main/10 hover:text-main dark:hover:bg-main/10 dark:hover:text-main cursor-pointer border dark:bg-transparent"
                variant="outline"
              >
                Explore More
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex max-h-180 flex-1 pt-5 items-end justify-center">
            <Image
              src="/assets/images/Theo-Vance.svg"
              alt="Bodybuilder man"
              width={467}
              height={700}
              className="object-contain object-top"
            />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative z-10 mt-auto">
          <HeroCarousel />
        </div>
      </section>
    </>
  );
}
