import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role = "user", children }) => {
   if (role !== "admin") {
      return <Navigate to="/login" replace />;
   }
   return <>{children}</>;
};

export default ProtectedRoute;
