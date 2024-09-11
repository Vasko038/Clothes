import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../api/users.ts";
import { Loading } from "../components/Loading.tsx";
import { useUser } from "../App.tsx";
import { useEffect } from "react";
import { findUser } from "../api/checkUser.ts";

export const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [addUser, { isLoading, isError }] = useAddUserMutation();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const user = await findUser(token);
        if (user) {
          if (user.role === "user") {
            navigate("/home");
          } else if (user.role === "admin") {
            navigate("/admin");
          }
        }
      }
    };

    checkUser();
  }, [navigate]);

  const onFinish = async () => {
    const data = form.getFieldsValue();
    try {
      const user = await addUser({ ...data, role: "user" }).unwrap();

      console.log({ user });
      message.success("Successfully registered");
      localStorage.setItem("token", user.token);
      setUser(user.data);
      navigate("/home");
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-500">Error occured</div>;

  return (
    <div className="px-10 pt-10">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-[350px] mx-auto"
      >
        <Form.Item
          name="fullname"
          label="Fullname"
          rules={[
            {
              required: true,
              message: "Please enter your full name",
            },
          ]}
        >
          <Input className="h-11" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input className="h-11" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input type="password" className="h-11" />
        </Form.Item>
        <p className="mb-3">
          By creating an account you agree with our Terms of Service, Privacy
          Policy,
        </p>
        <Button htmlType="submit" type="primary" className="h-11 w-[100%]">
          Create account
        </Button>
      </Form>
      <p className="text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <span
          onClick={() => {
            navigate("/login");
          }}
          className="text-black cursor-pointer"
        >
          Log in
        </span>
      </p>
    </div>
  );
};
