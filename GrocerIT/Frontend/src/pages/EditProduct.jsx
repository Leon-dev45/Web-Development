/* eslint-disable no-unused-vars */
import { useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Form from "../components/Form";
import Footer from "../components/Footer";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import EditForm from "../components/EditForm";

// eslint-disable-next-line react/prop-types
function EditProduct() {
  const location = useLocation();
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
        current=""
      />

      <EditForm setLoading={setLoading} data={location.state} />
      <Footer />
    </div>
  );
}

export default EditProduct;
