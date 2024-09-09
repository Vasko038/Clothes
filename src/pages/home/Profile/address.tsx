import { useUser } from "../../../App.tsx";
import Title from "antd/es/typography/Title";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useEditUserMutation } from "../../../api/users.ts";

export const Address = () => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [editUser] = useEditUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

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
      <Title level={3}>Shipping Address</Title>
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: "600px" }}
        onFinish={onFinish}
      >
        <Form.Item
          name="street"
          label="Street Address"
          rules={[{ required: true, message: "Please enter street address" }]}
        >
          <Input />
        </Form.Item>
        <div className="flex gap-4">
          <div className="w-[50%]">
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="zip"
              label="Zip Code"
              rules={[{ required: true, message: "Please enter zip code" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="w-[50%]">
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter country" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
