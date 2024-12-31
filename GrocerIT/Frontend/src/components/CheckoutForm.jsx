/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ setLoading, cartItems, user }) {
  const [userDetails, setUserDetails] = useState({
    user_address: "",
    user_name: "",
  });
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      userDetails.user_address.length < 20 ||
      userDetails.user_name.length < 3
    ) {
      return;
    }
    for (let i = 0; i < cartItems.length; i++) {
      const response = await axios.post(`http://127.0.0.1:5000/api/dashboard`, {
        ...cartItems[i],
        address: userDetails.user_address,
        delivered_to: userDetails.user_name,
        user: user,
      });
    }
    setLoading(false);
    alert("You will recieve your order");
    navigate("/");
  };

  return (
    <div className="flex w-full justify-center ">
      <form
        action=""
        className="bg-[#f7f7f7] w-[80%] box-border px-[7%] my-[6dvh] rounded-xl flex flex-col items-center py-[3dvh] space-y-[3dvh] backdrop-blur-[10px]"
      >
        <div className="title text-3xl font-semibold">Enter your details</div>
        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className="font-medium">
            Name
          </label>
          <div>
            <input
              type="text"
              className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
              value={userDetails.user_name}
              placeholder="Enter the name you want to deliver to"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_name: e.target.value.slice(0, 20),
                }))
              }
            />
            {userDetails.user_name.length < 3 && (
              <p className="text-red-600 underline text-sm italic mt-1">
                Username should contain atleast 3 characters
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className=" font-medium">
            Address
          </label>
          <div>
            <textarea
              rows={5}
              className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all resize-none"
              placeholder="Enter your address where you want it to be delivered"
              value={userDetails.user_address}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_address: e.target.value.slice(0, 200),
                }))
              }
            />
            {userDetails.user_address.length < 20 && (
              <p className="text-red-600 underline text-sm italic mt-1">
                Address should contain atleast 20 characters
              </p>
            )}
          </div>
        </div>

        <button
          className="w-full border-2 h-10 bg-green-500 rounded-lg hover:bg-green-700 shadow-lg"
          onClick={handleCheckout}
        >
          <p className="font-bold text-white">Submit</p>
        </button>
      </form>
    </div>
  );
}
