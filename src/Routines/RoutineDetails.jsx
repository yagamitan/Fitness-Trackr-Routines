import { useEffect, useState } from "react";
import { deleteRoutine, deleteSet, getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import { usePage } from "../layout/PageContext";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { token } = useAuth();
  const { routineId, setPage } = usePage();
  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  async function syncRoutine() {
    const routines = await getRoutines();
    const foundRoutine = routines.find((routine) => routine.id === routineId);
    setRoutine(foundRoutine);
  }

  useEffect(() => {
    syncRoutine();
  }, [routineId]);

  async function tryDeleteRoutine() {
    setError(null);

    try {
      await deleteRoutine(token, routine.id);
      setPage("routines");
    } catch (error) {
      setError(error.message);
    }
  }

  async function tryDeleteSet(setId) {
    setError(null);

    try {
      await deleteSet(token, setId);
      syncRoutine();
    } catch (error) {
      setError(error.message);
    }
  }

  if (!routine) return <p>Loading routine...</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>Goal: {routine.goal}</p>
      <p>Created by: {routine.creatorName}</p>

      {token && <button onClick={tryDeleteRoutine}>Delete routine</button>}

      {error && <p role="alert">{error}</p>}

      <h2>Sets</h2>

      {routine.sets.length === 0 ? (
        <p>This routine has no sets yet. Add one below.</p>
      ) : (
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.name}: {set.count} reps
              {token && (
                <button onClick={() => tryDeleteSet(set.id)}>Delete set</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <SetForm routineId={routineId} syncRoutine={syncRoutine} />
    </>
  );
}
