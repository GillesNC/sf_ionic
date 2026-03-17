import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import  { getToken } from "../services/authServices";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory(); // Hook pour la navigation

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  const logout = async () => {
    await logout();
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return context;
};
