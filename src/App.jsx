import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useAuthRedirect } from "./hooks/UseAuthRedirect";

// components
import { SuperAdminLayout, CompanyLayout } from "./layouts";
import { Admin, Users, Home, Items } from "./pages/super_admin";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  AddCompanyPage,
  ViewCompanyPage,
  EditCompanyPage,
} from "./pages/company";
import { AuthWrapper } from "./utils/AuthWrapper";

function App() {
  useAuthRedirect();

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/"
            element={
              <AuthWrapper>
                <SuperAdminLayout />
              </AuthWrapper>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/test-zustand" element={<TestZustand />} /> */}
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
