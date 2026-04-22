import { useParams } from 'react-router-dom';
import MainExercises from './components/main-exercises';
import { useGetExercises } from './hooks/use-get-exercises';

export default function ExercisePage() {
  const difficultyId = '69d982ed85f6bfa972bf2216';

  const { id: muscleId } = useParams();

  const { data: exercises } = useGetExercises(muscleId as string, difficultyId);
  

  return <MainExercises exercises={exercises} />;
}
