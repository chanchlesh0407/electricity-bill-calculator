import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LandingNavbar from "../components/LandingNavbar";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    first_name: "",
    lastname: "",
    mobile: "",
    ivrs: "",
    address: "",
    aadhar: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    let err = {};

    if (!data.first_name) err.first_name = "Required";
    if (!data.lastname) err.lastname = "Required";

    if (!/^[0-9]{10}$/.test(data.mobile)) err.mobile = "Invalid mobile";
    if (!data.ivrs) err.ivrs = "Required";
    if (!data.address) err.address = "Required";

    if (!/^[0-9]{12}$/.test(data.aadhar)) err.aadhar = "Invalid Aadhar";
    if (!/\S+@\S+\.\S+/.test(data.email)) err.email = "Invalid email";

    if (data.password.length < 6) err.password = "Min 6 characters";
    if (data.password !== data.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    return err;
  };

  const handleSubmit = async () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    try {
      setLoading(true);

      // 🔥 REMOVE confirmPassword before sending
      const { confirmPassword, ...payload } = data;

      const res = await registerUser(payload);

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Registered Successfully");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <LandingNavbar />

      <div className="flex flex-1">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 bg-indigo-600 text-white p-10 items-center justify-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">⚡ SmartBill</h1>
            <p className="text-lg opacity-90">
              Create your account and manage electricity smartly.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center items-center w-full md:w-1/2 p-6">

          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create Account
            </h2>

            {/* NAME */}
            <div className="grid grid-cols-2 gap-3">
              <input
                className="input-premium"
                placeholder="First Name"
                onChange={(e) =>
                  setData({ ...data, first_name: e.target.value })
                }
              />
              <input
                className="input-premium"
                placeholder="Last Name"
                onChange={(e) =>
                  setData({ ...data, lastname: e.target.value })
                }
              />
            </div>
            <p className="error">
              {errors.first_name || errors.lastname}
            </p>

            {/* MOBILE */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <input
                className="input-premium"
                placeholder="Mobile"
                onChange={(e) =>
                  setData({ ...data, mobile: e.target.value })
                }
              />
              <input
                className="input-premium"
                placeholder="IVRS"
                onChange={(e) =>
                  setData({ ...data, ivrs: e.target.value })
                }
              />
            </div>
            <p className="error">{errors.mobile || errors.ivrs}</p>

            {/* AADHAR */}
            <input
              className="input-premium mt-2"
              placeholder="Aadhar"
              onChange={(e) =>
                setData({ ...data, aadhar: e.target.value })
              }
            />
            <p className="error">{errors.aadhar}</p>

            {/* ADDRESS */}
            <textarea
              className="input-premium mt-2"
              placeholder="Address"
              onChange={(e) =>
                setData({ ...data, address: e.target.value })
              }
            />
            <p className="error">{errors.address}</p>

            {/* EMAIL */}
            <input
              className="input-premium mt-2"
              placeholder="Email"
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
            />
            <p className="error">{errors.email}</p>

            {/* PASSWORD */}
            <div className="grid grid-cols-2 gap-3 mt-2">

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-premium pr-10"
                  placeholder="Password"
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

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="input-premium pr-10"
                  placeholder="Confirm"
                  onChange={(e) =>
                    setData({
                      ...data,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

            </div>

            <p className="error">
              {errors.password || errors.confirmPassword}
            </p>

            {/* BUTTON */}
            <button
              className="w-full mt-5 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>

            {/* LOGIN */}
            <p className="text-sm text-center mt-4">
              Already have an account?
              <span
                className="text-indigo-600 cursor-pointer ml-1"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}