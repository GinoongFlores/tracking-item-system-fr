import { useContext } from "react";
import { authContext } from "./AuthContext";

export default function UseAuthContext() {
  return useContext(authContext);
}
