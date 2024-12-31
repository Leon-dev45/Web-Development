/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Sidenav from "../components/Sidenav";
import ProductNav from "../components/ProductNav";
import Footer from "../components/Footer";
import Procard from "../components/Procard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/get_cart_item/${String(user)}`
      );
      setCartItems(response.data);
    };
    if (user === null) {
      navigate(-1);
    }
    fetchCart();
  }, []);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: cartItems });
  };

  return (
    <div>
      <ProductNav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <Sidenav sideNav={sideNav} toggleSideNav={toggleSideNav} current="cart" />
      {cartItems.map((item) => (
        <Procard type="cart" data={item} key={item._id} />
      ))}
      {cartItems.length === 0 && (
        <div className="h-16 w-full justify-center items-center flex">
          <p className="font-bold text-gray-300">Your cart is empty</p>
        </div>
      )}
      <div className="w-full justify-center flex gap-10 mb-5">
        <button
          className="w-[30%] border-2 border-[#386bc0] hover:shadow-[0_4px_11px_1px_#386bc0] m-3 h-12 shadow-[0_2px_7px_0px_#386bc0] hover:bg-[#386bc0]"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
        <button
          className="w-[30%] border-2 border-green-500 m-3 h-12 shadow-[0_2px_7px_0px_#3fec48] hover:shadow-[0_4px_11px_1px_#2fb336] hover:bg-green-500"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
