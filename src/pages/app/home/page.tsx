import AboutPage from '../about/page';
import ClassesPage from '../classes/page';
import HealthyPage from '../healthy/page';
import HeroSection from './components/hero-section';

export default function HomePage() {
  return (
    <main className="relative grid w-full grid-cols-1">
      <HeroSection />
      <div className="pt-8">
        <ClassesPage />
      </div>

      <AboutPage />

      <HealthyPage />
    </main>
  );
}
