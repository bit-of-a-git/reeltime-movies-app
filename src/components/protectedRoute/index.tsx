import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Spinner />;

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
