import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useAuthRedirect } from "./hooks/UseAuthRedirect";

// components
import {
  SuperAdminLayout,
  CompanyLayout,
  UserLayout,
  ItemsLayout,
} from "./layouts";
import { Admin, Users, Home, Items } from "./pages/super_admin";
import { AddItem, UserHome, UserItems, UserProfile } from "./pages/user";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  AddCompanyPage,
  ViewCompanyPage,
  EditCompanyPage,
} from "./pages/company";
import { AuthWrapper } from "./utils/AuthWrapper";
import { UserRole } from "./hooks/UserRole";

function App() {
  const userRole = UserRole();
  const superAdmin = userRole === "super_admin";
  const admin = userRole === "admin";
  const users = userRole === "user";
  useAuthRedirect();

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Routes>
          {superAdmin && (
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <SuperAdminLayout />
                </AuthWrapper>
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="items" element={<Items />} />
              <Route path="users" element={<Users />} />
              <Route path="admin" element={<Admin />} />
              {/* <Route path="/test-zustand" element={<TestZustand />} /> */}
              <Route path="company" element={<CompanyLayout />}>
                <Route path="/company" element={<ViewCompanyPage />} />
                <Route path="add" element={<AddCompanyPage />} />
                <Route path="edit" element={<EditCompanyPage />} />
              </Route>
            </Route>
          )}

          {users && (
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <UserLayout />
                </AuthWrapper>
              }
            >
              <Route path="/" element={<UserHome />} />
              <Route path="/items" element={<ItemsLayout />}>
                <Route path="/items" element={<UserItems />} />
                <Route path="add" element={<AddItem />} />
              </Route>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          )}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
