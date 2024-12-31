/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase config/firebase.config";

const AdminNav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("User");
    auth.signOut();
    if (
      location.pathname === "/cart" ||
      location.pathname === "/seller" ||
      location.pathname === "/admin" ||
      location.pathname === "/query"
    ) {
      navigate("/");
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <nav className="w-full box-border sticky top-0 z-[3] text-black ">
      <div
        id="nav1"
        className="flex justify-between px-[3%] items-center h-[11dvh] bg-white"
      >
        <div className="flex w-[14%] justify-between items-center">
          <button
            className="menu w-fit hover:bg-black hover:bg-opacity-20 py-[1dvh] px-[0.2vw] rounded-lg"
            onClick={props.toggleSideNav}
          >
            <IoIosMenu className="text-[1.7vw]" />
          </button>
          <Link to="/" className="text-3xl font-semibold">
            Spice IT
          </Link>
        </div>

        <div className="font-medium text-lg w-4/12 flex gap-5 justify-end items-center">
          <Link to="/" className="hover:underline">
            Become a buyer
          </Link>
          <button
            className="border border-solid border-[#1dbf73] text-[#1dbf73] px-[1.1vw] py-[0.7dvh] rounded hover:bg-[#1dbf73] hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
