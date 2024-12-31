/* eslint-disable no-unused-vars */
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Form from "../components/Form";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";

function CreateProduct() {
  const [sideNav, setSideNav] = useState(false);
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Loading loading={loading} />
      <AdminNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      <AdminSidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="create"
      />
      <ProductForm setLoading={setLoading} />
      <Footer />
    </div>
  );
}

export default CreateProduct;
