/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Sidenav from "../components/Sidenav";
import ProductNav from "../components/ProductNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Seller = () => {
  const [sideNav, setSideNav] = useState(false);
  const user = localStorage.getItem("User");
  console.log(user);
  const navigate = useNavigate();
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
      <ProductNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      <Sidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="seller"
      />
      <Form />
      <Footer />
    </div>
  );
};

export default Seller;
