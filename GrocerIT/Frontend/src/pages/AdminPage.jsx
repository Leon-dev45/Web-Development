import { useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSidenav from "../components/AdminSideNav";
import Panel from "../components/Panel";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";

export default function AdminPage() {
  const [sideNav, setSideNav] = useState(false);
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  return (
    <div>
      <AdminNav sideNav={sideNav} toggleSideNav={toggleSideNav} />
      <AdminSidenav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        current="dashboard"
      />
      <div className="flex flex-row w-full">
        <Dashboard />
        <Panel />
      </div>
      <Footer />
    </div>
  );
}
