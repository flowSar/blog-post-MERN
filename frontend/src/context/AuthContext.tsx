import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../services/api/axiosInstance";
import type { UserInterface } from "../utils/types";

interface AuthContextProps {
  isLogged: boolean;
  user: UserInterface | null;
  loading: boolean;
  checkAuth?: () => void;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLogged: false,
  user: null,
  loading: false,
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []); // ✅ run only once

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await api.get(
          "http://localhost:4444/auth/validatetoken"
        );
        setUser(data.user);
        setIsLogged(true);
      }
    } catch (error: any) {
      console.log("Validate token failed: ", error);
      setIsLogged(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    isLogged,
    user,
    loading,
    checkAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
