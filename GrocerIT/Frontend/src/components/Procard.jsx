/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Stars from "./Stars";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Procard({ type, data }) {
  const navigation = useNavigate();
  const [quantity, setQuantity] = useState(data.cart_quantity);
  const user = localStorage.getItem("User");
  const [allReviews, setAllReciews] = useState({ rating: 0, count: 0 });

  const addItem = async () => {
    if (quantity === data.product_stock) {
      alert("You cannot add more product");
    } else {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/add_cart/${user}/${data._id}`,
        {
          type: "inc",
          number: 1,
        }
      );
      if (response.data === "Success") {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await axios.get(
        `http://127.0.0.1:5000/api/comment_by_product/${user}/${data._id}`
      );
      const totalReviews = reviews.data.reduce((prev, curr) => {
        return (prev + curr.rating) / reviews.data.length;
      }, 0);
      setAllReciews({ rating: totalReviews, count: reviews.data.length });
    };
    fetchReviews();
  }, []);

  const addToCart = async () => {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/add_cart/${user}/${data._id}`,
      {
        type: "asc",
        number: 1,
      }
    );
  };

  const removeItem = async () => {
    if (quantity > 1) {
      const response = await axios.post(
        `http://127.0.0.1:5000/api/add_cart/${user}/${data._id}`,
        {
          type: "dec",
          number: 1,
        }
      );
      if (response.data === "Success") {
        setQuantity((prev) => prev - 1);
      }
    } else {
      await axios.delete(
        `http://127.0.0.1:5000/api/delete_cart_item/${user}/${data._id}`
      );
      navigation("/refresh");
    }
  };

  const deleteItem = async () => {
    await axios.delete(
      `http://127.0.0.1:5000/api/delete_cart_item/${user}/${data._id}`
    );
    navigation("/refresh");
  };

  return (
    <div
      to="/product"
      className={`shadow-xl mx-auto my-[2dvh] hover:cursor-pointer ${
        type === "prod" ? "w-8/12" : "w-8/12"
      } ${
        type === "prod" ? "aspect-[4/1]" : "aspect-[5/1]"
      }  grid grid-cols-[1fr_2fr_1fr] overflow-hidden rounded-[3.5dvh] box-border bg-white`}
    >
      <div
        className=" box-border m-[10%] [&:hover>img]:scale-[1.2]
            rounded-[1.8dvh] overflow-hidden [&:hover>img]:contrast-[0.8] [&:hover>img]:filter"
      >
        <img
          src={data.product_images[0]}
          alt=""
          className="object-cover h-full transition-all duration-500 cursor-pointer "
        />
      </div>
      <div
        onClick={() => navigation("/product", { state: { data: data } })}
        className="bg-white box-border flex flex-col my-[7%] gap-y-2"
      >
        <div className="name text-2xl font-semibold">{data.product_name}</div>
        <div className="description text-lg  text-[#4F4F4F]">
          {data.product_description}
        </div>
        <div className="description text-lg  text-[#4F4F4F]">
          Product Owner: {data.product_owner}
        </div>
        {type === "prod" && (
          <Stars reviews={allReviews.count} stars={allReviews.rating} />
        )}
      </div>
      {type === "prod" ? (
        <div className=" my-[10%] mx-[5%] box-border pl-[7%] flex flex-col justify-around py-[3%] border-l border-solid">
          <div className="text h-full justify-between space-y-[1dvh]">
            <div className="price flex space-x-[3%]">
              <div className="discount text-2xl font-medium text-[#4f4f4f]">
                ₹{data.product_price}
              </div>
            </div>
            <div className="free font-medium text-[#14A44D] text-lg">
              Free Shipping
            </div>
          </div>
          <div className="buttons flex flex-col h-full  justify-evenly">
            {/* <button className="bg-[#386bc0]  text-white font-semibold w-[90%] py-[2%] text-sm rounded-[0.8dvh] shadow-[0_2px_7px_0px_#386bc0] hover:shadow-[0_4px_11px_1px_#386bc0]  hover:bg-[#386bc0] transition-all duration-300">
              DETAILS
            </button> */}
            <button
              className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-green-500 hover:text-white hover:bg-green-600 transition duration-300 box-border hover:shadow-[0_2px_7px_0px_#386bc0]"
              onClick={addToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      ) : type === "cart" ? (
        <div className="buttons flex flex-col h-full justify-center gap-5">
          <div className="flex flex-row gap-2.5">
            <button
              className="bg-white border-2 border-green-500 font-semibold w-[40%] py-[2%] text-sm rounded-[0.8dvh] shadow-[0_2px_7px_0px_#3fec48] hover:shadow-[0_4px_11px_1px_#2fb336]  hover:bg-green-500 transition-all duration-300"
              onClick={addItem}
            >
              ADD
            </button>
            <p className="mt-1 italic">{quantity}</p>
            <button
              className="bg-white font-semibold w-[40%] py-[2%] text-sm border-red-500 border-solid border-2 rounded-[0.8dvh] shadow-[0_2px_7px_0px_#ee4242] hover:shadow-[0_4px_11px_1px_#b32f2f]  hover:bg-red-700 transition-all duration-300"
              onClick={removeItem}
            >
              REMOVE
            </button>
          </div>
          <button
            className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-red-700 hover:bg-red-700 transition duration-300 box-border hover:shadow-[0_2px_7px_0px_#386bc0]"
            onClick={deleteItem}
          >
            DELETE PRODUCT
          </button>
        </div>
      ) : (
        <div className="buttons flex flex-col h-full justify-center gap-5">
          <button className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-green-500 hover:bg-green-500 transition duration-300 box-border hover:shadow-[0_4px_11px_1px_#2fb336]">
            {type === "superadmin" ? "MAKE SUPER ADMIN" : "EDIT PRODUCT"}
          </button>
          <button className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-red-700 hover:bg-red-700 transition duration-300 box-border hover:shadow-[0_2px_7px_0px_#386bc0]">
            {type === "superadmin" ? "DELETE USER" : "DELETE PRODUCT"}
          </button>
        </div>
      )}
    </div>
  );
}
