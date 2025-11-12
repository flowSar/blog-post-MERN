import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function CanDeletePost({ children }: { children: ReactNode }) {
  const { user, isLogged } = useAuth();

  if (isLogged) {
    if (user?.permissions.includes("delete_post")) {
      return children;
    }
    return <></>;
  }
  return <></>;
}

export default CanDeletePost;
