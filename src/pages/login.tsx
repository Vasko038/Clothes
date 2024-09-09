import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/auth";
import { useEffect } from "react";
import { findUser } from "../api/checkUser";

export const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [login] = useLoginMutation();

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
			}
		};

		checkUser();
	}, [navigate]);

	const onFinish = async () => {
		const data = form.getFieldsValue();
		try {
			const res = await login(data).unwrap();

			localStorage.setItem("token", res.token);

			if (res.data.role === "user") {
				navigate("/homepage");
				message.success("Welcome back");
			} else if (res.data.role === "admin") {
				navigate("/admin");
				message.success("Welcome back admin!");
			}
		} catch (error) {
			console.log("Login failed", error);
			message.error("Email or password are wrong");
		}
	};

	return (
		<div className="px-10 pt-10">
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinish}
				className="w-[350px] mx-auto"
			>
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

				<Button
					htmlType="submit"
					type="primary"
					className="h-11 w-[100%]"
				>
					Login
				</Button>
			</Form>
		</div>
	);
};
