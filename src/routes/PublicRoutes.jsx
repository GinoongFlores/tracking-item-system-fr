import Login from "../components/Login";
import Register from "../components/Register";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import Items from "../pages/super_admin/Items";
import Home from "../pages/super_admin/Home";
import Users from "../pages/super_admin/Users";
import Admin from "../pages/super_admin/Admin";

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
