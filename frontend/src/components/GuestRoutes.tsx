import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";

function GuestRoute({ children }: { children: ReactNode }) {
  const { isLogged, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Laoding..</div>;
  }
  if (isLogged) {
    return <Navigate to={"/"} />;
  }

  return children;
}

export default GuestRoute;
