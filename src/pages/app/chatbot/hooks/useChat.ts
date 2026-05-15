import type { Level, Meal, MealCategory, MuscleGroup } from '@/lib/types/chatbot';
import { useState } from 'react';
import { ChatService } from '../services/chatbot.service';
import { useTranslations } from 'use-intl';

// Keywords that should trigger specific intents — checked BEFORE meal search
const EXERCISE_KEYWORDS = ['تمرين', 'تمارين', 'exercise', 'exercises', 'workout'];
const LEVEL_KEYWORDS    = ['مستوى', 'مستويات', 'level', 'levels', 'difficulty'];
const MUSCLE_KEYWORDS   = ['عضلة', 'عضلات', 'muscle', 'muscles'];
const MEAL_KEYWORDS     = ['أكل', 'اكل', 'وجبة', 'وجبات', 'diet', 'جوعان', 'food', 'meal', 'eat'];

function matchesAny(msg: string, keywords: string[]) {
  return keywords.some((kw) => msg.includes(kw));
}

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('chatbot');

  const processMessage = async (input: string): Promise<string> => {
    setLoading(true);
    const msg = input.toLowerCase().trim();

    try {
      // ── 1. Exercise intent ──────────────────────────────────────────────
      if (matchesAny(msg, EXERCISE_KEYWORDS)) {
        const data = await ChatService.getExercises();
        if (!data?.length) return t('error');
        const item = data[0];
        return (
          `💪 ${t('suggest-u-exercises')}: ${item.exercise}\n` +
          `🎯 ${t('target')}: ${item.target_muscle_group}\n` +
          `📊 ${t('level')}: ${item.difficulty_level}\n` +
          `🎬 ${t('video')}: ${item.short_youtube_demonstration_link}`
        );
      }

      // ── 2. Level intent ─────────────────────────────────────────────────
      if (matchesAny(msg, LEVEL_KEYWORDS)) {
        const data = await ChatService.getLevels();
        if (!data?.length) return t('error');
        const levels = data.map((l: Level) => l.name).join(' - ');
        return `📊 ${t('available-levels')}:\n${levels}`;
      }

      // ── 3. Muscle intent ────────────────────────────────────────────────
      if (matchesAny(msg, MUSCLE_KEYWORDS)) {
        const data = await ChatService.getMuscles();
        if (!data?.length) return t('error');
        const muscles = data.slice(0, 6).map((m: MuscleGroup) => m.name).join('، ');
        return `💪 ${t('focused-muscles')}: ${muscles}`;
      }

      // ── 4. Meal category intent ─────────────────────────────────────────
      if (matchesAny(msg, MEAL_KEYWORDS)) {
        const categories = await ChatService.getMeals();
        if (!categories?.length) return t('error');
        const list = categories.slice(0, 6).map((c: MealCategory) => `🍽️ ${c.strCategory}`).join('\n');
        return `${t('suggested-meals')}\n\n${list}\n\n${t('which-category')}`;
      }

      // ── 5. Named meal category (e.g. user typed "Seafood") ──────────────
      const categories = await ChatService.getMeals();
      const foundCategory = categories?.find((cat: MealCategory) =>
        msg.includes(cat.strCategory.toLowerCase()),
      );

      if (foundCategory) {
        const meals: Meal[] = await ChatService.getMealsByCategory(foundCategory.strCategory);
        if (meals.length) {
          const mealList = meals.slice(0, 5).map((m) => `🍴 ${m.strMeal}`).join('\n');
          return `${foundCategory.strCategory}:\n\n${mealList}\n\n${t('which-category')}`;
        }
      }

      // ── 6. Specific meal search (last resort) ───────────────────────────
      if (msg.length > 2) {
        const searchRes = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(msg)}`,
        );
        const searchData = await searchRes.json();

        if (searchData.meals?.length) {
          const meal = searchData.meals[0];
          const ingredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure    = meal[`strMeasure${i}`];
            if (ingredient?.trim()) ingredients.push(`${ingredient} (${measure})`);
          }

          return (
            `🍽️ ${t('meal-description')}: ${meal.strMeal}\n\n` +
            `📂 ${t('category')}: ${meal.strCategory}\n` +
            `🌍 ${t('cuisine')}: ${meal.strArea}\n\n` +
            `🛒 ${t('ingredients')}:\n${ingredients.slice(0, 8).join('\n')}\n\n` +
            `👨‍🍳 ${t('preparation')}:\n${meal.strInstructions.substring(0, 300)}...\n\n` +
            `📺 ${t('tutorial')}: ${meal.strYoutube || t('not-available')}`
          );
        }
      }

      // ── 7. Fallback ─────────────────────────────────────────────────────
      return t('default-question');
    } catch (error) {
      return `${t('error')} ${error instanceof Error ? error.message : ''}`;
    } finally {
      setLoading(false);
    }
  };

  return { processMessage, loading };
};
