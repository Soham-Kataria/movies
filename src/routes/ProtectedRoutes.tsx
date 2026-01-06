import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/context";
import { Spin } from "antd";

export const ProtectedRoute = () => {
  const { isLoggedIn, authInitialized } = useContext(UserContext);
  if (!authInitialized) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
