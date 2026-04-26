import { useNavigate, useLocation } from "react-router-dom";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    // If NOT on home page → go to home first
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* LOGO */}
        <div
          onClick={() => handleScroll("home")}
          className="text-xl font-bold text-indigo-600 cursor-pointer"
        >
          ⚡ SmartBill
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">

          <button onClick={() => handleScroll("home")} className="hover:text-indigo-600">
            Home
          </button>

          <button onClick={() => handleScroll("features")} className="hover:text-indigo-600">
            Features
          </button>

          <button onClick={() => handleScroll("contact")} className="hover:text-indigo-600">
            Contact
          </button>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Get Started
        </button>

      </div>
    </nav>
  );
}