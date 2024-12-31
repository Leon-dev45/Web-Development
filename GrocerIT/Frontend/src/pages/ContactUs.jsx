/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Login from "../components/Login";
import ProductNav from "../components/ProductNav";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";

export default function ContactUs() {
  const [userQuery, setUserQuery] = useState("");
  const navigation = useNavigate();
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  const handleSeller = async (e) => {
    e.preventDefault();
    if (userQuery.length > 0) {
      alert("Your query has been submitted!");
    }
    setUserQuery("");
  };
  const [params] = useSearchParams();

  return (
    <div>
      {params.get("type") === "admin" ? (
        <div>
          <AdminNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
          <AdminSidenav
            sideNav={sideNav}
            toggleSideNav={toggleSideNav}
            current="contact"
          />
        </div>
      ) : (
        <div>
          {register && (
            <Login showRegister={showRegister} register={register} />
          )}
          <ProductNav
            sideNav={sideNav}
            toggleSideNav={toggleSideNav}
            register={register}
            showRegister={showRegister}
          />
          <Sidenav
            sideNav={sideNav}
            toggleSideNav={toggleSideNav}
            current="contact"
          />
        </div>
      )}
      <div className="flex w-full justify-center ">
        <form
          action=""
          className="bg-[#f7f7f7] w-[80%] box-border px-[7%] my-[6dvh] rounded-xl flex flex-col items-center py-[3dvh] space-y-[3dvh] backdrop-blur-[10px]"
        >
          <div className="title text-3xl font-semibold">Enter your details</div>
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Query
            </label>
            <div>
              <textarea
                rows={5}
                className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all resize-none"
                placeholder="Enter the query you have we will get back to you in 2-3 business days"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
              {userQuery.length < 20 && userQuery.length > 0 && (
                <p className="text-red-600 underline text-sm italic mt-1">
                  Query should contain atleast 20 characters
                </p>
              )}
            </div>
          </div>
          <button
            className="w-full border-2 h-10 bg-green-500 rounded-lg hover:bg-green-700 shadow-lg"
            onClick={handleSeller}
          >
            <p className="font-bold text-white">Submit</p>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
