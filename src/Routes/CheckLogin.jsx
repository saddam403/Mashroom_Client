import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CheckLogin({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Checking authentication...
      </div>
    );
  }

  // 🔒 If already logged in → redirect away from login
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
