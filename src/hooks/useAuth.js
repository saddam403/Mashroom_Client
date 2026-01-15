import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { user, login, logout, loading } = useAuthContext();
  const navigate = useNavigate();

  const requireAdmin = () => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/login");
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    requireAdmin,
    isAdmin: user?.role === "admin",
    isLoggedIn: !!user,
  };
}
