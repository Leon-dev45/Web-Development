/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { auth } from "../firebase config/firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Nav(props) {
  const location = useLocation();
  const navigation = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      navigation("/products/all", {
        state: { searchTerm: event.target.value },
      });
    }
  };

  const handleRegister = () => {
    props.showRegister(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    auth.signOut();
    if (location.pathname === "/cart" || location.pathname === "/seller") {
      navigation("/");
    } else {
      navigation(location.pathname);
    }
  };
  const user = localStorage.getItem("User");
  const onSellerClick = async () => {
    const data = await axios.get(`http://127.0.0.1:5000/api/auth/user/${user}`);
    if (data.data.data.user_type === "user") {
      navigation("/seller");
    } else {
      navigation("/admin");
    }
  };

  useEffect(() => {
    const scrollWatcher = document.createElement("div");
    const nav = document.querySelector("nav");
    const nav1 = document.querySelector("#nav1");
    const search = document.querySelector("#search");

    // const ht = Math.round(screen.height / 3);
    // const sto = ht + "px 0px 0px 0px";
    const menu = document.querySelectorAll(".menu div");
    scrollWatcher.setAttribute("data-scroll-ref", "");
    nav.parentNode.insertBefore(scrollWatcher, nav);
    nav1.style.transition = "background-color .3s ease";

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        nav1.style.backgroundColor = "white";
        nav1.style.color = "black";
        nav1.style.textShadow = "";
        search.style.visibility = "visible";
        menu[0].style.backgroundColor = "#838383";
        menu[1].style.backgroundColor = "#838383";
        menu[2].style.backgroundColor = "#838383";
      } else {
        nav1.style.backgroundColor = "transparent";
        nav1.style.color = "white";
        nav1.style.textShadow = "0px 0px 10px black";
        search.style.visibility = "hidden";
        menu[0].style.backgroundColor = "white";
        menu[1].style.backgroundColor = "white";
        menu[2].style.backgroundColor = "white";
      }
    });

    observer.observe(scrollWatcher);

    return () => {
      observer.unobserve(scrollWatcher);
      scrollWatcher.remove();
    };
  }, []);

  return (
    <nav className=" h-[18dvh] w-full box-border sticky top-0 z-[10] text-white ">
      <div
        id="nav1"
        className="flex justify-between px-[3%] items-center h-[11dvh]"
      >
        <div className="flex w-[14%] justify-between items-center">
          {/* <button className="w-[1.9vw]" onClick={props.toggleSideNav}><img src={menu} alt="" className='aspect-square w-full'/></button> */}
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
              // to={
              //   localStorage.getItem("type") === "admin" ? "/admin" : "/seller"
              // }
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
}
