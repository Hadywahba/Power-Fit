interface CategoryProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function MealCard({
  idMeal,
  strMeal,
  strMealThumb,
}: CategoryProps) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition-transform duration-200 hover:-translate-y-1 dark:bg-gray-900">
      <div className="relative w-full overflow-hidden bg-gray-50 pt-[80%]">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-800">
          #{idMeal}
        </span>
        <h3 className="mt-1 mb-1 font-serif text-base font-semibold dark:text-gray-200">
          {strMeal}
        </h3>
      </div>
    </div>
  );
}
