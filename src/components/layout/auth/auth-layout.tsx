import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main
      className={cn(
        'relative min-h-screen w-full',
        'before:absolute before:inset-0',
        "before:bg-[url('/assets/images/person-fit.png')]",
        'before:bg-cover before:bg-center',
        "before:content-['']",
        'after:absolute after:inset-0',
        'after:bg-[#24242499] after:backdrop-blur-xl',
        "after:content-['']",
      )}
    >
      {/* Content */}
      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <section className="hidden items-center justify-center border-r-[rgba(255,65,0,0.2)] text-white lg:flex lg:flex-col lg:border-r-2">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Upper Part */}
            <div>
              <img
                src="/assets/images/logo.webp"
                alt="logo"
                className="h-full w-50.75 object-cover"
              />
            </div>

            {/* Lower Part */}
            <div>
              <img
                src="/assets/images/person.png"
                alt="Person"
                className="h-100 w-150"
              />
            </div>
          </div>
        </section>

        {/* Right */}
        <section className="flex items-center justify-center p-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
