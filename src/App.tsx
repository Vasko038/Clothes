import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { ConfigProvider } from "antd";
import ProtectedRoute from "./pages/protectedRoute";
import Layout from "./components/Layout";
import { createContext, useContext, useState } from "react";
import { IUser } from "./interface";
import About from "./pages/home/About";

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
        path: "home",
        element: <Layout />,
        children: [
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <About />,
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

const UserContext = createContext<{
  user: IUser;
  setUser: (value: IUser) => void;
}>({
  user: {},
  setUser: (value: IUser | null) => {
    console.log(value);
  },
});

export const useUser = () => {
  return useContext(UserContext);
};

function App() {
  const [user, setUser] = useState<IUser>({});

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0E1422",
        },
      }}
    >
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={routes}></RouterProvider>
      </UserContext.Provider>
    </ConfigProvider>
  );
}

export default App;
