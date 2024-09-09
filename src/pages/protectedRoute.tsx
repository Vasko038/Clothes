import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { findUser } from "../api/checkUser";
import { Loading } from "../components/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await findUser(token);
        if (user) {
          if (user.role === "user") {
            if (location.pathname === "/") {
              navigate("/homepage", { replace: true });
            } else if (location.pathname.startsWith("/admin")) {
              navigate("/admin", { replace: true });
            }
          } else if (
            user.role === "admin" &&
            !location.pathname.startsWith("/admin")
          ) {
            navigate("/admin", { replace: true });
          }
        }
      } else {
        navigate("/login", { replace: true });
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  return children;
};

export default ProtectedRoute;
