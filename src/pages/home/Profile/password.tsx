import { useUser } from "../../../App.tsx";
import Title from "antd/es/typography/Title";
import { Button, Form, Input, message } from "antd";
import { useEditUserMutation } from "../../../api/users.ts";

export const Password = () => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [editUser] = useEditUserMutation();

  const onFinish = async () => {
    try {
      const data = form.getFieldsValue();
      if (data.password == data.confirmPass) {
        if (user.id) {
          await editUser({ id: user.id, data: { password: data.password } });
          message.success("Password updated successfully");
        }
      } else {
        message.error("Failed to update password");
      }
    } catch (error) {
      message.error("Failed to update password");
      console.error(error);
    }
  };

  return (
    <div>
      <Title level={3}>Change Password</Title>
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: "400px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="confirmPass"
          label="Confirm Password"
          rules={[
            { required: true, message: "Please enter confirmation password" },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form>
    </div>
  );
};
