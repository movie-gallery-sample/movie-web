"use client";

import { User } from "@/types/auth";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
