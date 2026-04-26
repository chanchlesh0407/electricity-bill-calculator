import { BarChart2, User, Calculator, FileText } from "lucide-react";

export default function Sidebar({ setActive, active }) {

  // 🔥 SAFE PARSE
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔥 FIX NAME (BACKEND FORMAT)
  const fullName =
    storedUser?.first_name
      ? `${storedUser.first_name} ${storedUser.lastname || ""}`
      : "User";

  const menu = [
    { id: "analytics", name: "Analytics", icon: <BarChart2 size={18}/> },
    { id: "profile", name: "Profile", icon: <User size={18}/> },
    { id: "calculator", name: "Calculator", icon: <Calculator size={18}/> },
    { id: "history", name: "Bills", icon: <FileText size={18}/> },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-lg flex flex-col">

      {/* USER SECTION */}
      <div className="px-5 pt-5 pb-4 border-b">

        <div className="flex items-center gap-3">

          {/* AVATAR */}
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg">
            {fullName.charAt(0)}
          </div>

          {/* TEXT */}
          <div className="leading-tight">
            <p className="text-xs text-gray-500">Welcome</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {fullName}
            </p>
          </div>

        </div>

      </div>

      {/* MENU */}
      <div className="p-5 space-y-2 flex-1">

        {menu.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
              ${
                active === item.id
                  ? "bg-indigo-100 text-indigo-600 font-medium shadow-sm"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            {item.icon}
            {item.name}
          </div>
        ))}

      </div>

      {/* LOGOUT */}
      <div className="px-5 pb-5 border-t pt-4">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token"); // 🔥 IMPORTANT
            window.location.href = "/login";
          }}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}