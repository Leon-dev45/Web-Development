/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import User2 from "../assets/user2.jpg";

export default function AdminCard({ data }) {
  const navigate = useNavigate();
  const deleteAdmin = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:5000/api/auth/user/${data._id}`
    );
    if (response.data === "Admin deleted") {
      navigate("/refresh");
    } else {
      alert("something went wrong");
    }
  };
  const makeSuperAdmin = async () => {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/auth/superuser/${data._id}`
    );
    if (response.data === "Success") {
      navigate("/refresh");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="shadow-xl mx-auto my-[2dvh] w-8/12 aspect-[5/1] grid grid-cols-[1fr_2fr_1fr] overflow-hidden rounded-[3.5dvh] box-border bg-white">
      <div
        className="h-[60%] items-center justify-center flex box-border m-[10%] [&:hover>img]:scale-[1.2]
            rounded-[1.8dvh] w-[80%] [&:hover>img]:contrast-[0.8] [&:hover>img]:filter"
      >
        <img
          src={User2}
          alt="adminimages"
          className="object-cover rounded-[1.8dvh] h-full transition-all duration-500 cursor-pointer "
        />
      </div>
      <Link
        to="/product"
        className="bg-white box-border flex flex-col items-start justify-start p-14"
      >
        <div className="name text-2xl font-semibold">{data.user_email}</div>
        <div className="description text-lg  text-[#4F4F4F]">
          {data.user_name}
        </div>
        <div className="description text-lg  text-[#4F4F4F]">
          {data.user_shop_address}
        </div>
        <div className="description text-lg  text-[#4F4F4F]">
          {data.user_phone_no}
        </div>
      </Link>

      <div className="buttons items-center flex flex-col h-full mt-16 gap-5">
        <button
          className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-green-500 hover:bg-green-500 transition duration-300 box-border hover:shadow-[0_4px_11px_1px_#2fb336]"
          onClick={makeSuperAdmin}
        >
          MAKE SUPER ADMIN
        </button>
        <button
          className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-red-700 hover:bg-red-700 transition duration-300 box-border hover:shadow-[0_2px_7px_0px_#386bc0]"
          onClick={deleteAdmin}
        >
          DELETE ADMIN
        </button>
      </div>
    </div>
  );
}
