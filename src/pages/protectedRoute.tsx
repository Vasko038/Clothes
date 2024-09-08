import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUser } from "../api/checkUser";

const ProtectedRoute = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			const checkUser = async () => {
				const token = localStorage.getItem("token");

				if (token) {
					const user = await findUser(token);
					if (user) {
						if (user.role === "user") {
							navigate("/homepage");
							// message.success("Welcome back!");
						} else if (user.role === "admin") {
							navigate("/admin");
						}
					}
				}
			};

			checkUser();
		} else {
			navigate("/login");
		}
	}, [navigate]);

	return children;
};

export default ProtectedRoute;
