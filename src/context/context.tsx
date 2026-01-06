import { createContext, useEffect, useState } from "react";
import type { ProviderType, ProviderProps, User } from "../constants/types";
import {
  getToken,
  getAuthUser,
  setAuthToken,
  setAuthUser,
  clearAuthStorage,
  isTokenPresent,
} from "../utils/authService";

export const UserContext = createContext<ProviderType>({} as ProviderType);

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Initialize auth ONCE
  useEffect(() => {
    if (isTokenPresent()) {
      const storedToken = getToken();
      const storedUser = getAuthUser();

      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }

      if (storedUser) {
        setUser(storedUser);
      }
    }
    setAuthInitialized(true);
  }, []);

  const login = (newToken: string, userData?: User) => {
    setAuthToken(newToken);
    setToken(newToken);
    setIsLoggedIn(true);

    if (userData) {
      setAuthUser(userData);
      setUser(userData);
    }
  };

  const logout = () => {
    clearAuthStorage();
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, token, isLoggedIn, authInitialized, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
// import { createContext, useEffect, useState } from "react";
// import type { ProviderType, ProviderProps, User } from "../constants/types";

// export const UserContext = createContext<ProviderType>({} as ProviderType);

// export const UserContextProvider = ({ children }: ProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Initialize auth once
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken) {
//       setToken(storedToken);
//       setIsLoggedIn(true);
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, []);

//   const login = (token: string, userData?: User) => {
//     localStorage.setItem("token", token);
//     setToken(token);
//     setIsLoggedIn(true);

//     if (userData) {
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     setToken("");
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <UserContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// import { createContext, useState } from "react";

// import type { ProviderType, ProviderProps, User } from "../constants/types";

// export const UserContext = createContext<ProviderType>({} as ProviderType);

// export const UserContextProvider = ({ children }: ProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState("");

//   return (
//     <UserContext.Provider
//       value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
