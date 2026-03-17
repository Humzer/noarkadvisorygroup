import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAILS = ["admin@gmail.com"];

export const useAdmin = () => {
  const { user, loading, signOut } = useAuth();
  const isAdmin = !!user && ADMIN_EMAILS.includes(user.email ?? "");
  return { user, loading, signOut, isAdmin };
};
