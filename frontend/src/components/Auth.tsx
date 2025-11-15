import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLogged, loading } = useAuth();
  // const navigate = useNavigate();

  if (loading) {
    return <div>Laoding..</div>;
  }
  if (!isLogged) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export default ProtectedRoute;
