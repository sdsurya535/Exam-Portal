import { Link } from "react-router-dom";

const LogoutBtn = ({logout}) => {
  return (
    <Link
      to={"/login"}
      className="text-sm no-underline  px-3 py-2 rounded-md font-semibold text-white text-[16px]  me-1 border  hover:bg-green-700"
      onClick={logout}
    >
      Logout
    </Link>
  );
};

export default LogoutBtn;
