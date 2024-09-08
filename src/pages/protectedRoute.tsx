import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUser } from "../api/checkUser";
import { Loading } from "../components/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await findUser(token);
        if (user) {
          if (user.role === "user") {
            navigate("/homepage");
          } else if (user.role === "admin") {
            navigate("/admin");
          }
        }
      } else {
        navigate("/login");
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate]);
  if (loading) {
    return <Loading />;
  }
  return children;
};

export default ProtectedRoute;
