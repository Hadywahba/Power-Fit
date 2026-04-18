import { useMealId } from '../hooks/use-meal-id';
import MealCard from './meals-card';

export default function MealsCategory({ id }: { id: string }) {
  // Query
  const { meals } = useMealId('Chicken');
  console.log(meals);
  console.log(id);
  if (!id) return null;
  return (
    <main>
      {/* Meals Card */}

      <section className="relative z-30 container mx-auto px-4 py-10 ">
        <div className="grid grid-cols-1 ">
          {meals?.meals?.map((cat) => (
            <MealCard
              key={cat.idMeal}
              idMeal={cat.idMeal}
              strMeal={cat.strMeal}
              strMealThumb={cat.strMealThumb}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
