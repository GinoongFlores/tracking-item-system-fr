import { useState } from "react";
import Login from "./components/Login";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />
      <Login />
    </>
  );
}

export default App;
