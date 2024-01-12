//import//
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  return loading ? null : user ? <Outlet /> : <Navigate to="/signin" />;
};
