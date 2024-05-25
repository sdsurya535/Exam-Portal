import {
  BarChart,
  CircleUser,
  LayoutList,
  MessageCircleQuestion,
  Brush,
  Wrench,
  SquarePlus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <a
        href="#"
        className="flex font-bold text-2xl text-green-700 transform justify-center items-center no-underline rounded-lg px-3 py-2  transition-colors duration-300 hover:bg-green-100"
      >
        ADMIN
      </a>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              analytics
            </label>
            <NavLink
              className="flex transform no-underline items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"/protected/admin"}
            >
              <BarChart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Dashboard</span>
            </NavLink>
            <NavLink
              className="flex transform
items-center rounded-lg px-3 py-2 no-underline text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"profile"}
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
              to={"categories"}
            >
              <LayoutList className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Categories</span>
            </NavLink>
            <NavLink
              className="flex no-underline transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"quizzes"}
            >
              <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Quizzes</span>
            </NavLink>

            <NavLink
              className="flex no-underline transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to={"add-quiz"}
            >
              <SquarePlus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium"> Add Quiz</span>
            </NavLink>
          </div>

          <div className="space-y-3 ">
            <label className="px-3 text-xs  font-semibold uppercase text-gray-900">
              Customization
            </label>
            <a
              className="flex transform no-underline items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Brush className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Themes</span>
            </a>
            <a
              className="flex transform no-underline items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Setting</span>
            </a>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
