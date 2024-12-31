import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [serachTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    navigate(`/products/${serachTerm}`, {
      state: { searchTerm: serachTerm },
    });
    navigate("/refresh");
  };
  return (
    <div
      id="home"
      className=" flex h-[82dvh]  box-border w-full bg-transparent relative "
    >
      <div className="space-y-[3dvh] ml-[30vw] mt-[20dvh]">
        <div className="text-3xl hover:cursor-default text-white font-semibold">
          Find Every Spice and Ingredient You Need
        </div>
        <div className="bg-white h-[7dvh] flex items-center rounded w-fit">
          <img
            src="./assets/search.png"
            alt=""
            className="h-[3.3dvh] m-[1.4dvh]"
          />
          <input
            className="border-none outline-none rounded-lg text-base w-[27.2vw] px-[0.8vw]"
            placeholder="Search For Any Ingredient ..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="submit"
            className="bg-[#1dbf73] hover:bg-[#327e5c] text-white self-stretch rounded-r px-[3vw] text-xs cursor-pointer transition-all"
            value="Search"
            onClick={() => handleSearch()}
          />
        </div>
        <div className="text-white space-x-[0.5vw] text-base font-semibold">
          <span className="hover:cursor-default">Popular:</span>
          <Link
            to={`products/Whole Spices`}
            className="border-2 border-white rounded-2xl px-[0.7vw] hover:text-black hover:bg-white hover:scale-105 transition-all"
          >
            Whole Spices
          </Link>
          <Link
            to={`/products/Chillies and Peppers`}
            className="border-2 border-white rounded-2xl px-[0.7vw] hover:text-black hover:bg-white hover:scale-105 transition-all"
          >
            Chillies and Peppers
          </Link>
          <Link
            to={`/products/Miscellaneous`}
            className="border-2 border-white rounded-2xl px-[0.7vw] hover:text-black hover:bg-white hover:scale-105 transition-all"
          >
            Miscellaneous
          </Link>
        </div>
      </div>
    </div>
  );
}
