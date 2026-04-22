import { Menu, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes/routes.constant';
import { cn } from '@/lib/utils/tailwind-merge/cn';

type NavItem = {
  name: string;
  to: string;
  end?: boolean;
};

const navigation: NavItem[] = [
  { name: 'Home', to: ROUTES.app.home, end: true },
  { name: 'About', to: ROUTES.app.about },
  { name: 'Classes', to: ROUTES.app.classes },
  { name: 'Healthy', to: ROUTES.app.healthy },
];

export default function AppNavbar() {
  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 z-40 border-b border-white/10 bg-[#242424] ">
      <div className="mx-auto flex h-17 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to={ROUTES.app.home}
          aria-label="Go to home page"
          className="flex items-center"
        >
          <img
            src="/assets/logo.png"
            alt="Super Fitness logo"
            className="h-12 w-20 object-contain sm:h-15"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'text-[15px] leading-none font-semibold hover:text-main transition-colors duration-300',
                  isActive ? 'text-main' : 'text-white/90',
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            to={ROUTES.app.profile}
            aria-label="Open profile"
            className="bg-main inline-flex size-9 items-center justify-center rounded-full text-white"
          >
            <UserRound size={14} />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to={ROUTES.app.profile}
            aria-label="Open profile"
            className="bg-main inline-flex size-9 items-center justify-center rounded-full text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <UserRound size={14} />
          </Link>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-md border border-white/20 text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#242424] md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-6"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-2 py-2 text-[15px] font-semibold',
                    isActive ? 'text-main' : 'text-white/90',
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
