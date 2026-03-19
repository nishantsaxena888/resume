import { useMemo } from "react";
import { useSession } from "./use-session";

export const useAdmin = () => {
  const { session }: any = useSession();
  const initials = useMemo(() => {
    const nameArr = session?.user?.name?.split(" ") || [];
    if (nameArr.length === 0) return "U";
    if (nameArr.length === 1) return nameArr[0].charAt(0).toUpperCase();
    return (
      nameArr[0].charAt(0).toUpperCase() + nameArr[1].charAt(0).toUpperCase()
    );
  }, [session?.user?.name]);

  return {
    // isAdmin: false,
    isAdmin: !["student", "teacher"].includes(session?.user?.role),
    role: session?.user?.role,
    name: session?.user?.name,
    email: session?.user?.email,
    username: session?.user?.username,
    userId: session?.user?.id,
    initials,
  };
};
