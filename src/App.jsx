import { Toaster } from "react-hot-toast";
import { Routes, Route, RouterProvider, BrowserRouter } from "react-router-dom";
import { UseAuthRedirect } from "./hooks/UseAuthRedirect";

import { AuthWrapper } from "./utils/AuthWrapper";
// import { AppRouter } from "./router";
import { Router } from "./router";

function App() {
  UseAuthRedirect();
  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
        <AuthWrapper>
          <Router />
        </AuthWrapper>
      </div>
    </>
  );
}

export default App;
