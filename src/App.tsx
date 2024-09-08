import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/login";
import { ConfigProvider } from "antd";
import ProtectedRoute from "./pages/protectedRoute";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<ProtectedRoute>
				<Outlet />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/homepage",
				element: <div>Homepage</div>,
			},
			{
				path: "/admin",
				element: <div>Admin</div>,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#0E1422",
				},
			}}
		>
			<RouterProvider router={routes}></RouterProvider>
		</ConfigProvider>
	);
}

export default App;
