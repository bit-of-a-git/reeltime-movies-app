import React from "react";
import { auth } from "../../config/firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  if (auth.currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
