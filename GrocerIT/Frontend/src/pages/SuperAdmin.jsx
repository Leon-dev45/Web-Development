import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Footer from "../components/Footer";
import axios from "axios";
import AdminCard from "../components/AdminCard";

export default function SuperAdmin() {
  const [sideNav, setSideNav] = useState(false);
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const adminUsers = await axios.get(
        `http://127.0.0.1:5000/api/auth/superuser/${localStorage.getItem(
          "User"
        )}`
      );
      setAdmins(adminUsers.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <AdminNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      <AdminSidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="super"
      />
      {admins.length === 0 && (
        <div className="h-40 w-full flex justify-center items-center">
          <p className="font-bold text-lg text-gray-400">No Admins found</p>
        </div>
      )}
      {admins.map((item, index) => (
        <AdminCard key={index} data={item} />
      ))}
      <Footer />
    </div>
  );
}
