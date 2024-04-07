import { AdminHome, AdminProfile, AdminItems } from "../pages/admin";
import { AdminLayout } from "../layouts";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "home",
        element: <AdminHome />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "items",
        element: <AdminItems />,
      },
    ],
  },
];
