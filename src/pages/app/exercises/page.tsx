import PageHero from '@/components/shared/page-hero';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslations } from 'use-intl';
import { useGetAllMuscles } from '../classes/hooks/use-get-all-muscles';
import { useGetMuscleGroups } from '../classes/hooks/use-get-muscle-group';
import { useGetMusclesByGroup } from '../classes/hooks/use-get-muscles-by-group';
import MainExercises from './components/main-exercises';
import { useGetExercises } from './hooks/use-get-exercises';
import { useGetLevels } from './hooks/use-get-levels';

const PAGE_SIZE = 6;

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function ExercisePage() {
  const t = useTranslations();
  const { id: muscleId } = useParams();

  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const { data: levels = [], isLoading: isLevelsLoading } = useGetLevels();
  const { data: exercises = [], isLoading: isExercisesLoading } =
    useGetExercises(muscleId as string, selectedLevelId);

  const { data: groups, isLoading: groupsLoading } = useGetMuscleGroups();
  const { data: allMuscles } = useGetAllMuscles(
    selectedGroupId === null ? groups : null,
  );
  const { data: filteredMuscles } = useGetMusclesByGroup(selectedGroupId);

  const muscles = selectedGroupId === null ? allMuscles : filteredMuscles;
  const pages = chunkArray(muscles ?? [], PAGE_SIZE);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <PageHero backgroundText={t('workouts')} className="lg:pb-1" />
      </div>

      <MainExercises
        groupsLoading={groupsLoading}
        groups={groups}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
        pages={pages}
        levels={levels}
        activeLevelId={selectedLevelId}
        onLevelChange={setSelectedLevelId}
        exercises={exercises}
        isLoading={isLevelsLoading || isExercisesLoading}
      />
    </div>
  );
}
