/* eslint-disable react/prop-types */
import masala from "./../assets/masala.png";
import chutney from "./../assets/chutney.png";
import whole from "../assets/whole.png";
import herbs from "../assets/herb.png";
import ground from "../assets/ground1.png";
import nuts from "../assets/sandn.png";
import blends from "../assets/blend.png";
import chillies from "../assets/chillies.png";
import { Link } from "react-router-dom";

export default function Categories({ type, headOn = false }) {
  const categories = [
    { name: "Whole Spices", img: whole },
    { name: "Ground Spices", img: ground },
    // { name: "Herbs and Leaves", img: herbs },
    { name: "Spice Blends", img: blends },
    { name: "Seeds and Nuts", img: nuts },
    { name: "Chillies and Peppers", img: chillies },
    { name: "Sweet Spices", img: chutney },
    { name: "Miscellaneous", img: masala },
  ];
  return (
    <div>
      {type === "home" ? (
        <section
          id="categories"
          className={`w-full flex flex-col items-center gap-[2dvh] ${
            type === "home" ? "pb-[20dvh] pt-[15dvh]" : "pb-[8dvh] pt-[8dvh]"
          }`}
        >
          <div className="flex font-semibold hover:cursor-default w-full px-10">
            <div
              className={`h-full w-[60%] flex justify-end mb-4 ${
                headOn && "hidden"
              }`}
            >
              <p className="font-semibold title text-[2.2rem]">Categories</p>
            </div>
            <div className="w-[40%] flex h-12 justify-end items-end">
              <Link
                to="/categories"
                className="text-[1.0rem] text-green-700 underline mr-24"
              >
                View more
              </Link>
            </div>
          </div>

          <div className="w-full grid grid-cols-4 grid-rows-auto gap-x-[4dvh] gap-y-[8dvh] px-[7%] justify-items-center">
            {categories.slice(0, 4).map((item, index) => (
              <Link
                key={index}
                // onClick={() => handleCategory(item.name)}
                to={`/products/${item.name}`}
                className="card w-[90%] shadow-xl aspect-[12/13] hover:border-green-600 hover:border-2  rounded-2xl flex flex-col items-center justify-center font-medium  text-2xl [&:hover>div>img]:scale-110 bg-white"
              >
                <div className="h-[75%] flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="h-[60%] object-contain transition-transform duration-300 ease-[ease]"
                  />
                </div>
                <div>{item.name}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <section
          id="categories"
          className={`w-full flex flex-col items-center gap-[2dvh] ${
            type === "home" ? "pb-[20dvh] pt-[15dvh]" : "pb-[8dvh] pt-[8dvh]"
          }`}
        >
          <div className="flex font-semibold hover:cursor-default w-full px-10">
            <div
              className={`h-full w-[60%] flex justify-end mb-4 ${
                headOn && "hidden"
              }`}
            >
              <p className="font-semibold title text-[2.2rem]">Categories</p>
            </div>
          </div>

          <div className="w-full grid grid-cols-4 grid-rows-auto gap-x-[4dvh] gap-y-[8dvh] px-[7%] justify-items-center">
            {categories.map((item, index) => (
              <Link
                key={index}
                to={`/products/${item.name}`}
                className="card w-[90%] shadow-xl aspect-[12/13] hover:border-green-600 hover:border-2  rounded-2xl flex flex-col items-center justify-center font-medium  text-2xl [&:hover>div>img]:scale-110 bg-white"
              >
                <div className="h-[75%] flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="h-[60%] object-contain transition-transform duration-300 ease-[ease]"
                  />
                </div>
                <div>{item.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
