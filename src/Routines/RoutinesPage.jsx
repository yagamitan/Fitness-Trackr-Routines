import { useEffect, useState } from "react";
import { getRoutines } from "../api/routines";
import RoutineForm from "./RoutineForm";
import { usePage } from "../layout/PageContext";

export default function RoutinesPage() {
  const [routines, setRoutinesList] = useState([]);
  const { setPage, setRoutineId } = usePage();

  async function syncRoutines() {
    const data = await getRoutines();
    setRoutinesList(data);
  }

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <button
              type="button"
              onClick={() => {
                setRoutineId(routine.id);
                setPage("routineDetails");
              }}
            >
              {routine.name}
            </button>
          </li>
        ))}
      </ul>
      <RoutineForm syncRoutines={syncRoutines} />
    </>
  );
}
