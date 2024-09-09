import { useUser } from "../../../App.tsx";
import Title from "antd/es/typography/Title";
import { Button, Form, Input, message } from "antd";
import { useEditUserMutation } from "../../../api/users.ts";
import { useEffect } from "react";

export const AccountDetails = () => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const onFinish = async () => {
    try {
      const data = form.getFieldsValue();
      if (user.id) {
        await editUser({ id: user.id, data });
        message.success("User updated successfully");
      }
    } catch (error) {
      message.error("Failed to update user");
      console.error(error);
    }
  };

  return (
    <div>
      <Title level={3}>Account Details</Title>

      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#F0F1FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlock: "20px",
        }}
      >
        {user.fullname
          ? user.fullname
              .split(" ")
              .map((part) => part[0].toUpperCase())
              .join("")
          : ""}
      </div>

      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: "400px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullname"
          label="Full name"
          rules={[{ required: true, message: "Please enter fullname" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
