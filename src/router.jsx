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

export const Router = () => {
  // const [routes, setRoutes] = useState([]);
  const userRole = UserRole();

  // useEffect(() => {
  //   setRoutes(newRoutes);
  //   setRoutesInitialized(true);
  // }, [userRole]);...

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
  return (
    <Routes>
      {PublicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}

      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}
    </Routes>
  );
};
