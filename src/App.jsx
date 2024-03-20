import Home from "./pages/admin/Home";
import Items from "./pages/admin/Items";

import Login from "./components/Login";
import Register from "./components/Register";
import SuperAdminLayout from "./layouts/SuperAdminLayout";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const routerSuperAdmin = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SuperAdminLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="items" element={<Items />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </>

    // public routes
  )
);

function App() {
  return (
    <>
      <RouterProvider router={routerSuperAdmin} />
    </>
  );
}

export default App;
