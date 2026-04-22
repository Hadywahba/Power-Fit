import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainExercises from './components/main-exercises';
import { useGetExercises } from './hooks/use-get-exercises';
import { useGetLevels } from './hooks/use-get-levels';

export default function ExercisePage() {
  const { id: muscleId } = useParams();
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const { data: levels = [], isLoading: isLevelsLoading } = useGetLevels();
  const safeLevels = Array.isArray(levels) ? levels : [];

  useEffect(() => {
    if (!selectedLevelId && safeLevels.length > 0) {
      setSelectedLevelId(safeLevels[0]._id);
    }
  }, [safeLevels, selectedLevelId]);

  const { data: exercises = [], isLoading: isExercisesLoading } = useGetExercises(
    muscleId as string,
    selectedLevelId,
  );

  return (
    <MainExercises
      levels={safeLevels}
      activeLevelId={selectedLevelId}
      onLevelChange={setSelectedLevelId}
      exercises={exercises}
      isLoading={isLevelsLoading || isExercisesLoading}
    />
  );
}
