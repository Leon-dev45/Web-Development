/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [userDetails, setUserDetails] = useState({
    user_name: "",
    user_phone_no: "",
    user_shop_address: "",
  });
  const navigation = useNavigate();

  const handleSeller = async (e) => {
    e.preventDefault();
    if (userDetails.user_phone_no.length < 10) {
      return
    }
    if(userDetails.user_shop_address.length < 20) {
      return
    }

    const data = await axios.post(
      `http://127.0.0.1:5000/api/auth/user/${localStorage.getItem("User")}`,
      {
        username: userDetails.user_name,
        user_phone: userDetails.user_phone_no,
        user_shop: userDetails.user_shop_address,
      }
    );
    if (data.data.data) {
      setUserDetails({
        user_name: "",
        user_phone_no: "",
        user_shop_address: "",
      });
      localStorage.setItem("type", "admin");
      navigation("/admin");
    } else {
      alert("Check the details filled");
    }
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
              placeholder="Enter your name (Note: If you do not wish to change the username then keep empty)"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_name: e.target.value.slice(0, 20),
                }))
              }
            />
            {userDetails.user_name.length < 3 && userDetails.user_name.length > 0 && (
                <p className="text-red-600 underline text-sm italic mt-1">
                  Username should contain atleast 3 characters
                </p>
              )}
          </div>
        </div>
        <div className="flex w-full max-md:flex-col items-center justify-evenly max-md:space-y-[2.5dvh] md:space-x-[5%]">
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Phone no
            </label>
            <div>
              <input
                type="number"
                className="w-full border rounded-md py-[0.5dvh] px-[2%] max-md:px-[5%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
                placeholder="Enter your phone number"
                value={Number(userDetails.user_phone_no).toString()}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    user_phone_no: e.target.value.slice(0, 10),
                  }))
                }
              />
              {userDetails.user_phone_no.length < 10 && (
                  <p className="text-red-600 underline text-sm italic mt-1">
                    Phone Number should contain 10 numbers
                  </p>
                )}
            </div>
          </div>
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Type
            </label>
            <select className="w-full border rounded-md py-[0.7dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.5)] transition-all">
              <option value="">Owns business</option>
              <option value="">Wholesaler</option>
              <option value="">Retailer</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className=" font-medium">
            Shop Address
          </label>
          <div>
            <textarea
              rows={5}
              className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all resize-none"
              placeholder="Enter your shop address (Note: enter home address if no shop)"
              value={userDetails.user_shop_address}
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  user_shop_address: e.target.value.slice(0, 200),
                }))
              }
            />
            {userDetails.user_shop_address.length < 20 && (
                <p className="text-red-600 underline text-sm italic mt-1">
                  Shop Address should contain atleast 20 characters
                </p>
              )}
          </div>
        </div>

        {/* <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className=" font-medium">
            Label
          </label>
          <input
            type="file"
            className="w-full border rounded-md py-[1dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
          />
        </div> */}
        <button
          className="w-full border-2 h-10 bg-green-500 rounded-lg hover:bg-green-700 shadow-lg"
          onClick={handleSeller}
        >
          <p className="font-bold text-white">Submit</p>
        </button>
      </form>
    </div>
  );
}
