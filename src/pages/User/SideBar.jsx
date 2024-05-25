import {
  BarChart,
  CircleUser,
  
} from "lucide-react";
import { NavLink } from "react-router-dom";
import categoryService from "../../services/Category";
import { useEffect, useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    categoryService.getAllCagegories().then(
      (response) => {
        setCategories(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <aside className="flex h-screen w-80 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <a
        href="#"
        className="flex font-bold text-2xl text-green-700 transform justify-center items-center no-underline rounded-lg px-3 py-2  transition-colors duration-300 hover:bg-green-100"
      >
        NORMAL
      </a>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              analytics
            </label>
            <NavLink
              className="flex transform no-underline items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"/protected/user-dashboard/0"}
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              className="flex transform
items-center rounded-lg px-3 py-2 no-underline text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"user-profile"}
            >
              <CircleUser className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </NavLink>
          </div>
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              content
            </label>

            <NavLink
                className="flex no-underline transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to={"0"}
              >
                <MdOutlineQuiz className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">All Quizzes</span>
              </NavLink>

            {categories.map((items) => (
              <NavLink
                key={items.cid}
                className="flex no-underline transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                to={`${items.cid}`}
              >
                <MdOutlineQuiz className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">{items.title}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
