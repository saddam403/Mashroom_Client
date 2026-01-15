import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
//import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  //const { user, loading } = useAuth();
   const {user,loading}=useContext(AuthContext)

  if (loading) return <div className="text-center text-gray-500 mt-10">Checking authentication...</div>;

 if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
  
}
