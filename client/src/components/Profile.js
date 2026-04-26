import { useState, useEffect } from "react";
import { User, Mail, Phone, Home, CreditCard } from "lucide-react";
import { getProfile, updateProfile } from "../services/api";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({});
  const [tempForm, setTempForm] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD PROFILE FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getProfile(token).then((data) => {
      setForm(data);
      setTempForm(data);
    });
  }, []);

  const handleChange = (e) => {
    setTempForm({ ...tempForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await updateProfile(tempForm, token);

      if (res.error) {
        alert(res.error);
        return;
      }

      setForm(tempForm);
      setIsEditing(false);
      alert("Profile Updated");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempForm(form);
    setIsEditing(false);
  };

  // 🔥 INPUT COMPONENT
  const renderInput = (icon, label, name, placeholder, colSpan = "") => (
    <div className={`flex flex-col gap-1 ${colSpan}`}>
      <label className="text-sm text-gray-600 font-medium">
        {label}
      </label>

      <div className="relative">
        {icon}

        {isEditing ? (
          <input
            name={name}
            value={tempForm[name] || ""}
            onChange={handleChange}
            className="input-profile"
            placeholder={placeholder}
          />
        ) : (
          <div className="view-field">
            {form[name] || "—"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex items-center justify-center">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Profile
          </h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">

          {renderInput(<User className="icon"/>, "First Name", "first_name", "First Name")}
          {renderInput(<User className="icon"/>, "Last Name", "lastname", "Last Name")}

          {renderInput(<Mail className="icon"/>, "Email", "email", "Email", "col-span-2")}

          {renderInput(<Phone className="icon"/>, "Mobile", "mobile", "Mobile")}
          {renderInput(<CreditCard className="icon"/>, "IVRS", "ivrs", "IVRS")}

          {renderInput(<CreditCard className="icon"/>, "Aadhar No", "aadhar", "Aadhar", "col-span-2")}

          {/* ADDRESS */}
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-sm text-gray-600 font-medium">
              Address
            </label>

            <div className="relative">
              <Home className="icon" />

              {isEditing ? (
                <textarea
                  name="address"
                  value={tempForm.address || ""}
                  onChange={handleChange}
                  className="input-profile"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="view-field">
                  {form.address || "—"}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}