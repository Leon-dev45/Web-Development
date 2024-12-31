import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProductNav from "../components/ProductNav";
import CheckoutForm from "../components/CheckoutForm";
import Loading from "../components/Loading";

function Checkout() {
  const { state } = useLocation();
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const user = localStorage.getItem("User");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      navigate(-1);
    }
  }, []);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  return (
    <div>
      <Loading loading={loading} />
      <ProductNav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <CheckoutForm setLoading={setLoading} cartItems={state} user={user} />
      <Footer />
    </div>
  );
}

export default Checkout;
