import { NavLink } from "react-router-dom";

const LoginBtn = () => {
  return (
    <>
      <NavLink
        to={"/login"}
        className={({ isActive }) =>
          `text-sm no-underline ${
            isActive ? " bg-green-700" : ""
          } px-3 py-2 rounded-md font-semibold text-white text-[16px]  me-1 border  hover:bg-green-700`
        }
      >
        Login
      </NavLink>

      <NavLink
        to={"/signup"}
        className={({ isActive }) =>
          `text-sm no-underline ${
            isActive ? " bg-green-700" : ""
          } px-3 py-2 rounded-md font-semibold text-white text-[16px]   hover:bg-green-700 `
        }
      >
        SignUp
      </NavLink>
    </>
  );
};

export default LoginBtn;
