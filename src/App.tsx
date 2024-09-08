import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
} from "react-router-dom";
import { useGetProductsQuery } from "./api";
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
	const {
		data: products,
		error,
		isLoading,
	} = useGetProductsQuery(undefined);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div className="text-red-500">Error</div>;

	console.log({ products });

	return (
		<ConfigProvider
			theme={
				{
					// algorithm: theme.darkAlgorithm,
				}
			}
		>
			<RouterProvider router={routes}></RouterProvider>
		</ConfigProvider>
	);
}

export default App;
