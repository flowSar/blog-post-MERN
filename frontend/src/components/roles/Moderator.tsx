import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function Moderate({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (user?.role !== "moderator") {
    return <></>;
  }
  return children;
}

export default Moderate;
