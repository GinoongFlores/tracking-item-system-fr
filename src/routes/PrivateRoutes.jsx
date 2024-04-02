import Home from "../pages/super_admin/Home";
import Items from "../pages/super_admin/Items";
import Users from "../pages/super_admin/Users";
import Admin from "../pages/super_admin/Admin";
import SuperAdminLayout from "../layouts/SuperAdminLayout";

export const PrivateRoutes = [
  {
    path: "/",
    element: <SuperAdminLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "items",
        element: <Items />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
];
