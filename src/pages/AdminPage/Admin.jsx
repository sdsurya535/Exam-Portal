import Forbidden from "../../components/Forbidden";
import authService from "../../services/auth";
import { Navigate } from "react-router-dom";

const Admin = ({ children }) => {
  if (
    authService.getUserRole() === "ADMIN" &&
    authService.isLoggedIn() &&
    authService.getUserRole() !== "NORMAL"
  ) {
    return <>{children}</>;
  } else {
    return <Forbidden />;
  }
};

export default Admin;
