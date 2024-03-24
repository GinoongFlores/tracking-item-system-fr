import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route, RouterProvider } from "react-router-dom";
import useAuthContext from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

import { SuperAdminLayout, CompanyLayout } from "./layouts";

import { Admin, Users, Home, Items } from "./pages/admin";

import {
  AddCompanyPage,
  ViewCompanyPage,
  EditCompanyPage,
} from "./pages/company";

function App() {
  const { user, loading } = useAuthContext();
  // console.log(user);
  let location = useLocation();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to={"/login"} replace={true} />;
  };

  if (loading) {
    return (
      <div className="h-screen bg:dark-gray-9000 dar:text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <SuperAdminLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/company" element={<CompanyLayout />}>
              <Route path="/company" element={<ViewCompanyPage />} />
              <Route path="add" element={<AddCompanyPage />} />
              <Route path="edit" element={<EditCompanyPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
