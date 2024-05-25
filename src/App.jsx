//import { Button, TextField } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { loggedIn } from "./store/loginSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { login } = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedIn());
  }, [login]);

  return (
    <>
      <Navbar />
      <Outlet />

      <Footer />
    </>
  );
}

export default App;
