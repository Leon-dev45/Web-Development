import { useEffect, useState } from "react";
import Login from "../components/Login";
import Sidenav from "../components/Sidenav";
import ProductNav from "../components/ProductNav";
import Procard from "../components/Procard";
import Footer from "../components/Footer";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const ProductsPage = () => {
  const params = useParams();
  const { state } = useLocation();
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const user = localStorage.getItem("User");
  useEffect(() => {
    const fetchAllProducts = async () => {
      if (state === null) {
        const gettingProducts = await axios.get(
          `http://127.0.0.1:5000/api/get-all-products`
        );
        if (params.category === "all") {
          setAllProducts(gettingProducts.data);
        } else {
          setAllProducts(
            gettingProducts.data.filter(
              (item) => item.product_category === params.category
            )
          );
        }
      } else {
        const getProducts = await axios.get(
          `http://127.0.0.1:5000/api/search/${user}/${state.searchTerm}`
        );
        setAllProducts(getProducts.data);
      }
    };
    fetchAllProducts();
  }, []);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  return (
    <div className="w-full font-sans">
      {register && <Login showRegister={showRegister} register={register} />}
      <ProductNav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <Sidenav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      {allProducts.map((item, index) => (
        <Procard key={index} type="prod" data={item} />
      ))}
      <Footer />
    </div>
  );
};

export default ProductsPage;
