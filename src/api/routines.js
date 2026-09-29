const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function createSet(token, newSet) {
  if (!token) {
    throw Error("You must be signed in to add a set.");
  }

  const response = await fetch(API + "/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newSet),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteRoutine(token, routineId) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(API + "/routines/" + routineId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteSet(token, setId) {
  if (!token) {
    throw Error("You must be signed in to delete a set.");
  }

  const response = await fetch(API + "/sets/" + setId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
