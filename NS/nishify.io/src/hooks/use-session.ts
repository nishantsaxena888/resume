"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { destroySession, saveSession } from "@/lib/auth";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export const decodeToken = () => {
  const token = getCookie("session-local");
  if (!token) return null;

  try {
    return jwtDecode(token as string);
  } catch (error) {
    return null;
  }
};

export const useSession = () => {
  const navigate = useRouter();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
      const authBase = process.env.NEXT_PUBLIC_AUTH_BASE_URL || apiBase.replace("/api", "");
      const url = `${authBase}/auth/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-nishify-client": "superadmin",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await res.json(); // { access_token, token_type }

      const decode_data: any = jwtDecode(data.access_token);
      const user_data = {
        access_token: data.access_token,
        username: decode_data?.sub,
        role: decode_data?.role || "administrator",
        permissions: decode_data?.permissions || "{}",
        exp: decode_data?.exp,
      };

      await saveSession(user_data);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nishify_admin_token", user_data.access_token);
      }

      return { data: user_data };
    } catch (err: any) {
      console.error("Login Exception:", err);
      return { error: err };
    }
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = async (url?: string) => {
    await destroySession();
    toast.success("Logged out");
    navigate.push(url || "/");
  };

  return {
    session: decodeToken() as any,
    login,
    logout,
  };
};
