import { useState } from "react";
import Login from "../components/Login";
import Sidenav from "../components/Sidenav";
import ProductNav from "../components/ProductNav";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

function CategoriesPage() {
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  return (
    <div>
      {register && <Login showRegister={showRegister} register={register} />}
      <ProductNav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <Sidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="category"
      />
      <Categories type="all" />
      <Footer />
    </div>
  );
}

export default CategoriesPage;
