import { Preferences } from "@capacitor/preferences";

const API_URL = "http://localhost:8080";

export async function register(
  email: string,
  username: string,
  password: string,
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Inscription échouée");
  }

  return await response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    await Preferences.set({ key: "token", value: data.token }); // On stocke le token dans les préférences et dans le localStorage
  } else {
    throw new Error(data.message || "Connexion échouée");
  }

  return data;
}

export async function logout() {
  await Preferences.remove({ key: "token" });
}

export async function getToken() {
  //const { value } = await Preferences.get({ key: "token" });
  const value  = await localStorage.getItem("token");
  return value;
}

export async function getProfile() {
  const token = await getToken();
  console.log("Token récupéré pour getProfileById:", token); // Debug: Affiche le token récupéré
  const response = await fetch(`${API_URL}/profile/${token}}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de la récupération du profil");
  }

  return await response.json();
}
