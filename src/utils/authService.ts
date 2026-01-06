// utils/authService.ts

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setAuthUser = (user: unknown) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuthUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isTokenPresent = () => {
  return !!localStorage.getItem("token");
};
// export const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   return !!token; // Returns true if a token exists, false otherwise
// };
