import {
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  SuperAdminRoutes,
  AdminRoutes,
  UserRoutes,
  PublicRoutes,
} from "./routes";
import { UserRole } from "./hooks/UserRole";
import { AuthWrapper } from "./utils/AuthWrapper";

export const AppRouter = () => {
  const userRole = UserRole();

  let routes;
  switch (userRole) {
    case "super_admin":
      routes = SuperAdminRoutes;
      break;
    case "admin":
      routes = AdminRoutes;
      break;
    case "user":
      routes = UserRoutes;
      break;
    default:
      routes = PublicRoutes;
  }

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} />
        ))}
      </Routes>
    </RouterProvider>
  );
};
