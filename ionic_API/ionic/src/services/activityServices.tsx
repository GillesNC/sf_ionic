import { getToken } from "./authServices";

const API_URL = "http://localhost:8080/activity";

export async function getActivities() {

  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la récupération des activités");
  }

  return await response.json();
}

export async function getMyActivities() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/my-activity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la récupération de votre activité");
  }

  return await response.json();
}

export async function createActivity(activityData: {
  title: string;
  description: string;
  type?: string;
  place: string;
  nbrPlace?: number;
  duree?: number;
}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la création de l'activité");
  }

  return await response.json();
}

export async function show(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  console.log("show", response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la récupération des détails de l'activité");
  }

  return await response.json();
}

export async function editActivity(id: string, activityData: {
  title?: string;
  description?: string;
  type?: string;
  place?: string;
  nbrPlace?: number;
  duree?: number;
}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/edit/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la modification de l'activité");
  }

  return await response.json();
}

export async function deleteActivity(id: string) {
  const token = await getToken();

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la suppression de l'activité");
  }

  return await response.json();
}
