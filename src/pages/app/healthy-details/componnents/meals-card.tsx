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
    <div onClick={()=>{
      
    }} className="flex cursor-pointer items-center gap-4 border-b border-white/5 px-4 py-3 transition-colors last:border-0 hover:bg-white/5">
      <img
        src={strMealThumb}
        alt={strMeal}
        className="size-20 shrink-0 rounded-xl border border-white/10 object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-sm font-medium text-gray-100">{strMeal}</p>
      </div>
      <span className="shrink-0 rounded-full border border-orange-900/50 bg-orange-950 px-2.5 py-1 text-xs font-medium text-orange-300">
        #{idMeal}
      </span>
      <span className="text-gray-600">›</span>
    </div>
  );
}
