import PageHero from '@/components/shared/page-hero';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import MainExercises from './components/main-exercises';
import { useGetExercises } from './hooks/use-get-exercises';
import { useGetLevels } from './hooks/use-get-levels';

export default function ExercisePage() {
    const t = useTranslations();
  const { id: muscleId } = useParams();
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const { data: levels = [], isLoading: isLevelsLoading } = useGetLevels();

  const { data: exercises = [], isLoading: isExercisesLoading } = useGetExercises(
    muscleId as string,
    selectedLevelId,
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
              <PageHero
          backgroundText={t('workouts')}
          className='lg:pb-1'
              />
      </div>
            {/* <FilterTabs
              className="mb-8"
              isLoading={tabsLoading}
              activeId={activeId}
              allTab={allTab}
              items={tabs}
              onChange={onChange}
      /> */}
      
      <MainExercises
        levels={levels}
        activeLevelId={selectedLevelId}
        onLevelChange={setSelectedLevelId}
        exercises={exercises}
        isLoading={isLevelsLoading || isExercisesLoading}
      />
    </div>
  );
}