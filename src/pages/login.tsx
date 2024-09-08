import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";

export const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	// Check if the user is already logged in on component mount
	useEffect(() => {
		const token = localStorage.getItem("token");

		const findUser = async (token: string) => {
			try {
				const res = await axios.get(
					"https://4e25aed7bbe24666.mokky.dev/auth_me",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return res.data;
			} catch (error) {
				console.error("Failed to fetch user info:", error);
				return null;
			}
		};

		const checkUser = async () => {
			if (token) {
				const user = await findUser(token);
				if (user) {
					if (user.role === "user") {
						navigate("/homepage");
						message.success("Welcome back!");
					} else if (user.role === "admin") {
						navigate("/admin");
						message.success("Welcome back admin!");
					}
				}
			}
		};

		checkUser();
	}, [navigate]);

	// Handle form submission
	const onFinish = async () => {
		const data = form.getFieldsValue();

		try {
			const res = await axios.post(
				"https://4e25aed7bbe24666.mokky.dev/auth",
				data,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			);

			if (res && res.data.token) {
				localStorage.setItem("token", res.data.token);

				// Navigate based on user role
				if (res.data.data.role === "user") {
					navigate("/homepage");
					message.success("Welcome back");
				} else if (res.data.data.role === "admin") {
					navigate("/admin");
					message.success("Welcome back admin!");
				}
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
				<Title level={3}>Login</Title>
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
