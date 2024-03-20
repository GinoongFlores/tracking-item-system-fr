import Home from "./pages/admin/Home";
import Items from "./pages/admin/Items";
import Users from "./pages/admin/Users";
import Admin from "./pages/admin/Admin";

import Login from "./components/Login";
import Register from "./components/Register";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import { AuthProvider } from "./context/AuthContext";

import { useNavigate, useLocation } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SuperAdminLayout />}>
          <Route path="/items" element={<Items />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />  */}
      </Routes>
    </>
  );
}

export default App;
