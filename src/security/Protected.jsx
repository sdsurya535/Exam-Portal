import { Navigate, useNavigate, Outlet } from "react-router-dom";
import AdminDashBoard from "../pages/Admin/AdminDashBoard";
import authService from "../services/auth";
import UserDashboard from "../pages/User/UserDashboard";
import SideBar from "../pages/Sidebar/SideBar";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../store/loginSlice";

const Protected = () => {
  //const { login } = useSelector((state) => state.log);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loggedIn());
  //   console.log("login effect changing:", login);
  // }, [login]);

  if (!authService.isLoggedIn()) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet/>;
};

export default Protected;
