import { UserHome, UserProfile, UserItems } from "../pages/user";
import { UserLayout } from "../layouts";

export const UserRoutes = [
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
