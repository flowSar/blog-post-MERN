import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function CanUpdatePost({ children }: { children: ReactNode }) {
  const { user, isLogged } = useAuth();

  if (isLogged) {
    if (user?.permissions.includes("update_post")) {
      return children;
    }
    return <></>;
  }
  return <></>;
}

export default CanUpdatePost;
