import { Outlet } from "react-router-dom";
import { loggedIn } from "../../store/loginSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import SideBar from "../Sidebar/SideBar";
import SideBar from "./SideBar";
import Loader from "../../components/Loader";
import axiosInstance from "../../services/intercepter";
import LoadingBar from "react-top-loading-bar";

const UserDashboard = () => {
  const { login } = useSelector((state) => state.log);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(loggedIn());
  }, [login]);

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (config) => {
        setProgress(100);
        setLoader(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (config) => {
        setLoader(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [loader]);

  return (
    <>
      <div className="flex">
        <LoadingBar
          color="#097969"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <SideBar />
        <section className="flex-1 bg-gray-200 p-3">
          <Loader show={loader} />
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
