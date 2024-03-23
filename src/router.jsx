import { Route, Routes } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./routes/PublicRoutes";

const router = () => {
  return (
    <>
      {PublicRoutes.map((route, key) =>
        route.children ? (
          <Route key={key} element={route.element}>
            {route.children.map((child, key) => (
              <Route key={key} path={child.path} element={child.element} />
            ))}
          </Route>
        ) : (
          <Route key={key} path={route.path} element={route.element} />
        )
      )}
    </>
  );
};

export default router;
