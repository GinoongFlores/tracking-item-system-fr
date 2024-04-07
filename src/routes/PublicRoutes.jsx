import Login from "../components/Login";
import Register from "../components/Register";

export const PublicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
