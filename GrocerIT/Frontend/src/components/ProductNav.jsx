/* eslint-disable react/prop-types */
import { IoIosMenu } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase config/firebase.config";
import axios from "axios";

const ProductNav = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      navigate(`/products/${event.target.value}`, {
        state: { searchTerm: event.target.value },
      });
      navigate("/refresh");
    }
  };
  const user = localStorage.getItem("User");

  const handleRegister = () => {
    props.showRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    auth.signOut();
    if (location.pathname === "/cart" || location.pathname === "/seller") {
      navigate("/");
    } else {
      navigate(location.pathname);
    }
  };
  const onSellerClick = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/api/auth/user/${user}`);
    if (data.data.data.user_type === "user") {
      navigate("/seller");
    } else {
      navigate("/admin");
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
        <input
          id="search"
          placeholder="Search"
          autoComplete="on"
          className="border-2 h-[6dvh] w-[40%] p-2 rounded-md mr-28"
          onKeyDown={(event) => handleKeyDown(event)}
        ></input>

        {user === null ? (
          <div className="font-medium text-lg w-4/12 flex justify-end gap-9 items-center">
            <Link to="/categories" className="hover:underline">
              Categories
            </Link>
            <Link to="/products/all" className="hover:underline">
              Products
            </Link>
            <button
              className="border border-solid border-[#1dbf73] text-[#1dbf73] px-[1.1vw] py-[0.7dvh] rounded hover:bg-[#1dbf73] hover:text-white transition-all duration-300"
              onClick={handleRegister}
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="font-medium text-lg w-4/12 flex gap-5 justify-end items-center">
            <Link to="/categories" className="hover:underline">
              Categories
            </Link>
            <Link to="/products/all" className="hover:underline">
              Products
            </Link>
            <div
              onClick={onSellerClick}
              className="hover:underline cursor-pointer"
            >
              Become a seller
            </div>
            <Link to="/cart" className="hover:underline cursor-pointer">
              Cart
            </Link>
            <button
              className="border border-solid border-[#1dbf73] text-[#1dbf73] px-[1.1vw] py-[0.7dvh] rounded hover:bg-[#1dbf73] hover:text-white transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProductNav;
