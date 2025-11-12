import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

function CanCreatePost({ children }: { children: ReactNode }) {
  const { user, isLogged } = useAuth();

  if (isLogged) {
    if (user?.permissions.includes("create_post")) {
      return children;
    }
    return <></>;
  }
  return <></>;
}

export default CanCreatePost;
