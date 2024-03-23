import Login from "../components/Login";
import Register from "../components/Register";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Items from "../pages/admin/Items";
import Home from "../pages/admin/Home";
import Users from "../pages/admin/Users";
import Admin from "../pages/admin/Admin";

export const PublicRoutes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];
