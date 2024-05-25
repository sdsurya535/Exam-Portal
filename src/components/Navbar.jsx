import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import authService from "../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import React from "react";

const Navbar = () => {
  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  const { login } = useSelector((state) => state.log);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logOut();
    dispatch(loggedOut(false));
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="relative w-full bg-[#4CAF50] px-2.5 py-2.5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-2xl text-white">ExamPortal</span>
        </div>
        <div className="hidden lg:block">
          <ul className="d-flex ms-5 justify-center mb-0 space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm no-underline ${
                      isActive ? " bg-green-700" : ""
                    } px-3 py-2 rounded-md font-semibold text-white text-[16px]  hover:bg-green-700`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          {!login && <LoginBtn />}
          {login && <LogoutBtn logout={handleLogout} />}
          {login && (
            <NavLink
              to={"/protected/admin"}
              className={({ isActive }) =>
                `text-sm no-underline ${
                  isActive ? " bg-green-700" : ""
                } px-3 py-2 rounded-md font-semibold text-white  ms-2 me-3   hover:bg-green-700`
              }
            >
              {authService.getUser().username}
            </NavLink>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-[#4CAF50] shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2"></div>
                  <div className="-mr-2">
                    {console.log(authService.isLoggedIn())}
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `-m-3 flex items-center rounded-md ${
                            isActive ? "bg-green-700" : ""
                          } p-3 text-sm no-underline font-semibold hover:bg-green-700`
                        }
                      >
                        <span className="ml-3 text-base font-medium text-white ">
                          {item.name}
                        </span>
                      </NavLink>
                    ))}
                  </nav>
                </div>

                <div className="mt-3">
                  {!login && (
                    <>
                      <NavLink
                        to={"/login"}
                        className={({ isActive }) =>
                          `text-sm no-underline ${
                            isActive ? " bg-green-700" : ""
                          } px-3 py-2 rounded-md font-semibold text-white  ms-2 me-3 border  hover:bg-green-700`
                        }
                      >
                        Login
                      </NavLink>

                      <NavLink
                        to={"/signup"}
                        className={({ isActive }) =>
                          `text-sm no-underline ${
                            isActive ? " bg-green-700" : ""
                          } px-3 py-2 rounded-md font-semibold text-white   hover:bg-green-700 `
                        }
                      >
                        SignUp
                      </NavLink>
                    </>
                  )}
                  {login && <LogoutBtn logout={handleLogout} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
