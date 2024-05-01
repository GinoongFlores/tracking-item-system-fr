import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { useAuthRedirect } from "./hooks";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

// components
import {
  SuperAdminLayout,
  CompanyLayout,
  UserLayout,
  ItemsLayout,
  AdminLayout,
} from "./layouts";
import { Admin, Users, Home, Items, Company } from "./pages/super_admin";
import {
  AddItem,
  UserHome,
  UserItems,
  UserProfile,
  TrashedItems,
  TransferItem,
  Transaction,
} from "./pages/user";
import {
  AdminHome,
  AdminItems,
  AdminUsers,
  AdminProfile,
  AdminTransaction,
} from "./pages/admin";

import { Login, Register, Admin as AdminTransactions } from "./components/forms";
import {
  AddCompanyPage,
  ViewCompanyPage,
  EditCompanyPage,
} from "./pages/company";
import { AuthWrapper } from "./utils";
import { UserRole } from "./hooks";

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
        <SkeletonTheme baseColor="#ffff" highlightColor="#0000">
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
                <Route path="/company" element={<CompanyLayout />}>
                  <Route index element={<Company />} />
                  <Route path="add" element={<AddCompanyPage />} />
                  <Route path="edit" element={<EditCompanyPage />} />
                </Route>
              </Route>
            )}

            {admin && (
              <Route
                path="/"
                element={
                  <AuthWrapper>
                    <AdminLayout />
                  </AuthWrapper>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="items" element={<AdminItems />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="transaction" element={<AdminTransaction />} />
                <Route path="admin/transaction" element={<AdminTransactions />} />
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
                <Route path="/item" element={<ItemsLayout />}>
                  <Route index element={<UserItems />} />
                  <Route path="add" element={<AddItem />} />
                  <Route path="trashed" element={<TrashedItems />} />
                  <Route path="transfer" element={<TransferItem />} />
                  <Route path="transaction" element={<Transaction />} />
                </Route>
                <Route path="/profile" element={<UserProfile />} />
              </Route>
            )}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </SkeletonTheme>
      </div>
    </>
  );
}

export default App;
