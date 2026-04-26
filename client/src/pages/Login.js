import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await loginUser(data);

      // 🔥 HANDLE ERROR FROM BACKEND
      if (!res.token) {
        alert(res.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // 🔥 STORE REAL DATA
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Login successful");

      navigate("/dashboard");

    } catch (err) {
        console.error(err);
        alert(err.message);  // ✅ FIX
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* NAVBAR */}
      <LandingNavbar />

      {/* MAIN */}
      <div className="flex flex-1">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 bg-indigo-600 text-white p-10 items-center justify-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">⚡ SmartBill</h1>
            <p className="text-lg opacity-90">
              Smart electricity management system.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-6">

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Login
            </h2>

            {/* EMAIL */}
            <input
              className="input"
              placeholder="Email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />

            {/* PASSWORD */}
            <div className="relative mt-3">
              <input
                type={showPassword ? "text" : "password"}
                className="input pr-10"
                placeholder="Password"
                value={data.password}
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
              />

              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* BUTTON */}
            <button
              className="btn-primary mt-5 w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* REGISTER */}
            <p className="text-sm text-center mt-4">
              New user?
              <span
                className="text-indigo-600 cursor-pointer ml-1"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
