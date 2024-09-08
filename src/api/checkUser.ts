import axios from "axios";

export const findUser = async (token: string) => {
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
