import { Admin, Company, Home, Items, Users } from "../pages/super_admin";
import { SuperAdminLayout, AdminLayout, UserLayout } from "../layouts";
import { AdminHome, AdminProfile, AdminItems } from "../pages/admin";
import { UserHome, UserProfile, UserItems } from "../pages/user";

/*
* Objectives for changing routes based on user roles
* 1. Add privates routes for super admin, admin and user. Each role will have its own layout and own routes.
* 2. On the `router.jsx` check the user role and return the routes based on the user role. Else, return the public routes.

*/

export const SuperAdminRoutes = [
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
        path: "company",
        element: <Company />,
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

export const adminRoutes = [
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

export const userRoutes = [
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "home",
        element: <UserHome />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "items",
        element: <UserItems />,
      },
    ],
  },
];
