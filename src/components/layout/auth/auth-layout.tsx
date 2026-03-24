import { cn } from '@/lib/utils/tailwind-merge/cn';
import { Outlet } from 'react-router-dom';
import AuthLayoutImages from './auth-layout-images';

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
          <AuthLayoutImages />
        </section>

        {/* Right */}
        <section className="flex items-center justify-center p-6">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
