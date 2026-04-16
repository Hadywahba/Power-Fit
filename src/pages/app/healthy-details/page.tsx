import Meals from './componnents/meals';
import MealsCategory from './componnents/meals-category';

export default function page() {
  
  return (
    <main className="grid grid-cols-1 md:grid-cols-12">
      {/* Left Side */}
      <section className="md:col-span-4">
        <Meals />
      </section>

      {/* Right Side */}
      <section className="md:col-span-8">
        <MealsCategory />
      </section>
    </main>
  );
}
