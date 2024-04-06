import { Toaster } from "react-hot-toast";
import { Routes, Route, RouterProvider } from "react-router-dom";
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
import { AppRouter } from "./router";

function App() {
  useAuthRedirect();
  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <AppRouter />
      </div>
    </>
  );
}

export default App;
