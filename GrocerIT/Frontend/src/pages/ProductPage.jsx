import { useState } from "react";
import Login from "../components/Login";
import Sidenav from "../components/Sidenav";
import ProductNav from "../components/ProductNav";
import Product from "../components/Product";
import Footer from "../components/Footer";
import SimilarProducts from "../components/SimilarProducts";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import RatingStars from "../components/Rating";
import Popular from "../components/Popular";

const ProductPage = () => {
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  return (
    <div className="w-full font-sans">
      <Loading loading={loading} />
      {register && <Login showRegister={showRegister} register={register} />}
      <ProductNav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <Sidenav sideNav={sideNav} toggleSideNav={toggleSideNav} />

      <Product
        setLoading={setLoading}
        register={register}
        showRegister={showRegister}
        productDetails={location.state.data}
      />
      <RatingStars product={location.state.data._id} />
      <Popular />
      <Footer />
    </div>
  );
};

export default ProductPage;
