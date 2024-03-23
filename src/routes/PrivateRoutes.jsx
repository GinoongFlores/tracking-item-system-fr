import Home from "../pages/admin/Home";
import Items from "../pages/admin/Items";
import Users from "../pages/admin/Users";
import Admin from "../pages/admin/Admin";
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
