import { createContext, useState } from "react";

import type { ProviderType, ProviderProps, User } from "../constants/types";

export const UserContext = createContext<ProviderType>({} as ProviderType);

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
