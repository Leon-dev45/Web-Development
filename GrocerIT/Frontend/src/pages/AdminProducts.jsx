import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Footer from "../components/Footer";
import axios from "axios";
import AdminProCard from "../components/AdminProCard";
import Loading from "../components/Loading";

export default function AdminProducts() {
  const [sideNav, setSideNav] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:5000/api/product/${localStorage.getItem("User")}`
      );
      console.log(response.data);
      setAdminProducts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-between flex-col">
      <Loading loading={loading} />
      <AdminNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      <AdminSidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="products"
      />
      {adminProducts.length === 0 && (
        <div className="h-40 w-full flex justify-center items-center">
          <p className="font-bold text-lg">No products found</p>
        </div>
      )}
      {adminProducts.map((item, index) => (
        <AdminProCard key={index} data={item} setLoading={setLoading} />
      ))}
      <Footer />
    </div>
  );
}
