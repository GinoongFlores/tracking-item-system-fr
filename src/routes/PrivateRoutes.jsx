import Home from "../pages/admin/Home";
import Items from "../pages/admin/Items";
import Users from "../pages/admin/Users";

export const PrivateRoutes = [
  {
    path: "/",
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
];
