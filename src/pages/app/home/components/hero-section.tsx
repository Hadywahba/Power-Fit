import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'

const stats = [
  { number: '1200+', label: 'Active Members' },
  { number: '12+',  label: 'Certified Trainers' },
  { number: '20+',  label: 'Year Of Experience' },
]

export default function HeroSection() {
  return (
    <section
      className="relative bg-[url('/assets/images/Theo_Vance.png')] bg-no-repeat bg-bottom-right bg-cover bg-white dark:bg-transparent text-zinc-800 dark:text-white min-h-200 flex items-center p-20 mb-10 overflow-hidden">

      {/* Gradient + Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl
        bg-linear-to-l
        from-white/90 via-white/75 to-white/50
        dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-800/40">
      </div>

      {/* Left content */}
      <div className="relative z-10 flex-1 max-w-[55%] pr-8">

        <p className="text-5xl font-bold uppercase leading-normal mb-6">
          Your body can
          <span className="text-main"> stand almost </span>
          anything.
        </p>

        <p className="relative text-xl font-normal max-w-160 pl-4 text-zinc-600 dark:text-white/80 mb-8 before:absolute before:inset-0 before:bg-main before:w-1 before:h-24 before:content-['']">
          It's your mind that needs convincing. Push past your limits, stay committed,
          and watch your body transform into a powerhouse of strength and resilience.
          Start your journey today & truly capable of!
        </p>

        <ul className="flex gap-12 py-5 mb-16 list-none">
          {stats.map(({ number, label }) => (
            <li key={label}>
              <span className="text-2xl font-bold">
                {number}
              </span>
              <span className="text-xl font-normal text-zinc-700 dark:text-white/90 mt-1 block">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <Button className="cursor-pointer">
            Get Started
          </Button>
          <Button
            className="text-main dark:bg-transparent border border-main cursor-pointer hover:bg-main/10 hover:text-main dark:hover:bg-main/10 dark:hover:text-main"
            variant="outline"
          >
            Explore More
          </Button>
        </div>
      </div>

      {/* Right image */}
      <div className="relative flex-1 flex justify-center items-end max-h-180">
          <Image
            src="/assets/images/Theo-Vance.svg"
            alt="Bodybuilder man"
            width={467}
            height={700}
            className="object-contain object-top"
          />
      </div>

    </section>
  )
}