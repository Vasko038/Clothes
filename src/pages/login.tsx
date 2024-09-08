import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

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

		// Async function inside useEffect
		const checkUser = async () => {
			if (token) {
				const user = await findUser(token);
				if (user) {
					if (user.role === "user") navigate("/homepage");
					else if (user.role === "admin")
						navigate("/admin");
				}
			}
		};

		checkUser();
	}, [navigate]);

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

			if (res) {
				// Store token in localStorage
				localStorage.setItem("token", res.data.token);

				console.log(res.data);

				// Navigate based on user role
				if (res.data.data.role === "user") {
					console.log("navigate user");
					navigate("/homepage");
				} else if (res.data.data.role === "admin") {
					console.log("navigate admin");
					navigate("/admin");
				}
			}
		} catch (error) {
			console.log("Login failed", error);
		}
	};

	return (
		<div>
			<Form form={form} layout="vertical" onFinish={onFinish}>
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
					<Input />
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
					<Input type="password" />
				</Form.Item>
				<Button
					htmlType="submit"
					type="primary"
					onClick={() => form.submit()}
				>
					Login
				</Button>
			</Form>
		</div>
	);
};
