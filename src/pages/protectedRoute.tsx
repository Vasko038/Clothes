import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { findUser } from "../api/checkUser";
import { useUser } from "../App";
import { Loading } from "../components/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await findUser(token);
        if (user) {
          setUser(user);
          if (user.role === "user") {
            if (location.pathname.startsWith("/admin")) {
              navigate("/home", { replace: true });
            } else if (location.pathname === "/") {
              navigate("/home", { replace: true });
            }
          } else if (user.role === "admin") {
            if (location.pathname === "/") {
              navigate("/admin", { replace: true });
            }
          }
        }
      } else {
        navigate("/login", { replace: true });
      }

      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;
