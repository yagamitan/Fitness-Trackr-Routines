import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { getActivities } from "../api/activities";
import { createSet } from "../api/routines";

export default function SetForm({ routineId, syncRoutine }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActivities() {
      const data = await getActivities();
      setActivities(data);
    }

    fetchActivities();
  }, []);

  if (!token) return null;

  async function tryCreateSet(formData) {
    setError(null);

    try {
      const activityId = Number(formData.get("activityId"));
      const count = Number(formData.get("count"));
      await createSet(token, { activityId, routineId, count });
      syncRoutine();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Add a set</h2>

      <form action={tryCreateSet}>
        <label>
          Activity
          <select name="activityId" required>
            <option value="">Choose an activity</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Reps
          <input type="number" name="count" min="1" required />
        </label>

        <button type="submit">Add set</button>
      </form>

      {error && <p role="alert">{error}</p>}
    </>
  );
}
