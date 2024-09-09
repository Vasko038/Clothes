import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { ConfigProvider } from "antd";
import ProtectedRoute from "./pages/protectedRoute";
import Layout from "./components/Layout";

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
        path: "homepage",
        element: <Layout />,
        children: [
          {
            index: true,
            path: "ch",
            element: <div>Child 1</div>,
          },
          {
            path: "chil",
            element: <div>Child 2</div>,
          },
        ],
      },
      {
        path: "admin",
        element: <div>Admin</div>,
      },
    ],
  },
  {
    path: "login",
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
