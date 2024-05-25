import { useEffect } from "react";
import { loggedIn } from "../../store/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

const AdminDashBoard = () => {
  const { login } = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedIn());
  }, [login]);

  return (
    <>
      <div className="flex">
      <SideBar/>
        <section className="flex-1 bg-gray-200 p-8">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default AdminDashBoard;
