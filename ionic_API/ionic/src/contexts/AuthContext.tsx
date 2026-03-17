import { createContext, useState } from "react";
import { useHistory } from "react-router";
import  { login, logout } from "../services/authServices";

interface AuthContextType {
  isActive: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory(); // Hook pour la navigation

  const login = async (email: string, password: string) => {
    try {
      await login(email, password);
      setIsActive(true);
    } catch (error) {
      console.error("Echec de la connexion:", error);
    }
  };

  const logout = async () => {
    await logout();
    setIsActive(false);
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isActive, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
