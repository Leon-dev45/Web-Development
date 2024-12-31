/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidenav(props) {
  const user = localStorage.getItem("User");
  return (
    <div>
      <div
        className={`top-0 left-0 h-[100dvh] w-[100vw] bg-black bg-opacity-50 z-[10] fixed ${
          props.sideNav ? "block" : "hidden"
        }`}
        onClick={props.toggleSideNav}
      ></div>
      <div
        className={`SideNav fixed top-0 left-0 bg-[#fbfbfb] w-full md:w-[30%] lg:w-[25%] xl:w-[18%] 2xl:w-[20%] h-full z-10 max-md:overflow-y-scroll ${
          props.sideNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="title font-semibold text-3xl px-[10%] py-[10%] flex items-end justify-between ">
          <span>Spice IT</span>
          <button
            className="text-green-400 font-semibold text-3xl"
            onClick={props.toggleSideNav}
          >
            <MdClose />
          </button>
        </div>
        <div className="links flex flex-col">
          <Link
            to="/"
            className={`${
              props.current === "home"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            {" "}
            <span>Home</span>
          </Link>

          <Link
            to="/categories"
            className={`${
              props.current === "category"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            <span>Categories</span>
          </Link>
          <Link
            to="/query?type=user"
            className={`${
              props.current === "seller"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            <span>Contact</span> Us
          </Link>
          {user !== null && (
            <Link
              to="/cart"
              className={`${
                props.current === "cart"
                  ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                  : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
              }`}
            >
              <span>Cart</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
