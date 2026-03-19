import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { login as loginService, logout as logoutService, getProfile } from "../services/authServices";


interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory(); // Hook pour la navigation

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getProfile();
        console.log("Profil récupéré :", data);
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

 async function login(email: string, password: string) {
    const data = await loginService(email, password);

    if (data.user) {
      setUser(data.user);
    }
  };

  async function logout() {
    await logoutService ();
    setUser(null);
    history.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
