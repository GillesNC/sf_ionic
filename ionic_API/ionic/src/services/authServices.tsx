import { Preferences } from "@capacitor/preferences";

const API_URL = "http://localhost:8080";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

// PARTIE INSCRIPTION USER
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

// PARTIE LOGIN & LOGOUT
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok && data.token) {
    localStorage.setItem("token", data.token);
    await Preferences.set({ key: "token", value: data.token });
  } else {
    throw new Error(data.message || "Connexion échouée");
  }
  return data;
}

export async function logout() {
  localStorage.removeItem("token");
  await Preferences.remove({ key: "token" });
}

export async function getToken(): Promise<string | null> {
  const { value } = await Preferences.get({ key: "token" });
  return value || null;
}
