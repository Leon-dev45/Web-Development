import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CampaignDetails from "./pages/CampaignDetails";
import Createcampaign from "./pages/CreateCampaign";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <div className="relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-campaign" element={<Createcampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/search/:id" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
