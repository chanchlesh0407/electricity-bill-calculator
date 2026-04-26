const BASE_URL = "https://electricity-bill-calculator-wyh5.onrender.com";

// 🔥 UNIVERSAL RESPONSE HANDLER
const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    // 🔥 DO NOT AUTO REDIRECT
    if (data.error === "No token") {
      localStorage.removeItem("token");
      throw new Error("Unauthorized");
    }

    throw new Error(data.error || "Server error");
  }

  return data;
};

// 🔥 COMMON HEADER HELPER
const getAuthHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

// ================= AUTH =================
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// ================= BILL =================
export const saveBill = async (bill, token) => {
  const res = await fetch(`${BASE_URL}/bills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(bill),
  });

  return handleResponse(res);
};

export const getBills = async (token) => {
  const res = await fetch(`${BASE_URL}/bills`, {
    headers: {
      ...getAuthHeader(token),
    },
  });

  return handleResponse(res);
};

// ================= PROFILE =================
export const getProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      ...getAuthHeader(token),
    },
  });

  return handleResponse(res);
};

export const updateProfile = async (data, token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(token),
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
};

// ================= ANALYTICS =================
export const getAnalytics = async (token) => {
  const res = await fetch(`${BASE_URL}/analytics`, {
    headers: {
      ...getAuthHeader(token),
    },
  });

  return handleResponse(res);
};

// ================= DELETE =================
export const deleteBill = async (id, token) => {
  const res = await fetch(`${BASE_URL}/bills/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(token),
    },
  });

  return handleResponse(res);
};
