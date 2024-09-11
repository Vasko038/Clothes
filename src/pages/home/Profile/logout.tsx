import Title from "antd/es/typography/Title";
import { Button } from "antd";
import { useUser } from "../../../App.tsx";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser({});
    navigate("/login");
  };

  return (
    <div>
      <Title level={3}>Logout</Title>
      <div className="max-w-[300px] mx-auto">
        <Title level={5} className="text-center mb-3 mt-16">
          Are you sure you want to logout?
        </Title>
        <Button className="w-[46%]">Cancel</Button>
        <Button
          className="w-[46%] ms-4"
          type="primary"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
