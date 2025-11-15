import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function Admin({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <></>;
  }
  return children;
}

export default Admin;
