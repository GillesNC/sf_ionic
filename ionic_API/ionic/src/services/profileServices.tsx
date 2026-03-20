import { getToken } from "./authServices";

const API_URL = "http://localhost:8080";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export async function getProfile() {
  const token = await getToken();

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }
  
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la récupération du profil");
  }

  return await response.json();
}
