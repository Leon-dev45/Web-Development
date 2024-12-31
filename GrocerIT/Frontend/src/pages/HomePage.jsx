import { useState } from "react";
import Nav from "../components/Nav";
import Vid from "../components/Vid";
import Home from "../components/Home";
import Categories from "../components/Categories";
import Popular from "../components/Popular";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import Login from "../components/Login";

export default function HomePage() {
  const [register, showRegister] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  return (
    <div className="w-full font-sans">
      {register && <Login showRegister={showRegister} register={register} />}
      <Nav
        sideNav={sideNav}
        toggleSideNav={toggleSideNav}
        register={register}
        showRegister={showRegister}
      />
      <Sidenav sideNav={sideNav} toggleSideNav={toggleSideNav} current="home" />
      <Vid />
      <Home />
      <Categories type="home" />
      <Popular />

      <Footer />
    </div>
  );
}
