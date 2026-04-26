import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import BillCalculator from "../components/BillCalculator";
import Analytics from "../components/Analytics";
import BillHistory from "../components/BillHistory";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [active, setActive] = useState("analytics");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f7fb]">

      {/* 🔥 NAVBAR */}
      <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">

        {/* LEFT: LOGO + NAME */}
        <div className="flex items-center gap-3">
          
          {/* LOGO */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-md">
            ⚡
          </div>

          {/* PROJECT NAME */}
          <h1 className="text-lg font-semibold text-gray-800">
            SmartBill
          </h1>

        </div>

        {/* CENTER: SECTION NAME */}
        <div className="hidden md:block text-gray-500 text-sm capitalize">
          {active}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <span className="text-sm text-gray-500">
            Welcome back 👋
          </span>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* 🔥 MAIN AREA */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar setActive={setActive} active={active} />

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-sm h-full w-full p-6 flex flex-col">

            {active === "analytics" && <Analytics />}
            {active === "profile" && <Profile />}
            {active === "calculator" && <BillCalculator />}
            {active === "history" && <BillHistory />}

          </div>
        </div>

      </div>
    </div>
  );
}