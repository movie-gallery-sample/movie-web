"use client";

import { setToken } from "@/lib/apiClient/privateClient";
import { User } from "@/types/auth";
import { useRouter } from "@/i18n/routing";
import { createContext, useContext, useState } from "react";
import { queryClient } from ".";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("access_token", user.accessToken as string);
    setToken(user.accessToken as string);
    router.push("/movies");
  };

  const logout = () => {
    queryClient.removeQueries();
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
