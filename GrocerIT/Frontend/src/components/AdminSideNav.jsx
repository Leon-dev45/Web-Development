/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

function AdminSidenav(props) {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  useEffect(() => {
    const checkSuper = async () => {
      const data = await axios.get(
        `http://127.0.0.1:5000/api/auth/user/${localStorage.getItem("User")}`
      );
      if (data.data.data.user_type == "super admin") {
        return setIsSuperAdmin(true);
      }
    };
    checkSuper();
  }, []);

  return (
    <div>
      <div
        className={`top-0 left-0 h-[100%] w-[100%] bg-black bg-opacity-50 z-[10] fixed ${
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
            to="/admin"
            className={`${
              props.current === "dashboard"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            {" "}
            <span>Dashboard</span>
          </Link>

          <Link
            to="/create-product"
            className={`${
              props.current === "create"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            <span>Create Product</span>
          </Link>
          {isSuperAdmin && (
            <Link
              to="/super-admin"
              className={`${
                props.current === "super"
                  ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                  : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
              }`}
            >
              <span>Admins</span>
            </Link>
          )}
          <Link
            to="/query?type=admin"
            className={`${
              props.current === "contact"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            <span>Contact</span> Us
          </Link>

          <Link
            to="/admin-products"
            className={`${
              props.current === "products"
                ? "active text-green-400 bg-white shadow-md my-[1%] before:left-0 before:w-[2%] before:h-full before:bg-green-400 before:absolute before:top-0 before:z-[5] font-semibold text-xl px-[10%] py-[5%] hover:bg-white flex items-center space-x-[3%] relative mx-[5%] rounded-md overflow-hidden"
                : "text-gray-600 text-xl px-[10%] py-[5%] font-medium hover:bg-white hover:shadow flex items-center space-x-[3%] mx-[5%] rounded-md relative overflow-hidden"
            }`}
          >
            <span>Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSidenav;
