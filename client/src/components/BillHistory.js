import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getBills, getProfile, deleteBill } from "../services/api";

export default function BillHistory() {
  const [bills, setBills] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 SAFE FORMAT FUNCTION
  const format = (val) => Number(val || 0).toFixed(2);

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("NO TOKEN FOUND ❌");
        return;
    }

    Promise.all([getBills(token), getProfile(token)])
        .then(([billsData, userData]) => {
        setBills(billsData);
        setUser(userData);
        })
        .catch((err) => {
        console.error("API ERROR:", err);
        })
        .finally(() => setLoading(false));

    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login again");
            return;
        }

        // ✅ FIRST CONFIRMATION
        const confirm1 = window.confirm("Are you sure you want to delete this bill?");
        if (!confirm1) return;


        try {
            const res = await deleteBill(id, token);

            if (!res || res.error) {
            alert(res?.error || "Delete failed");
            return;
            }

            // ✅ UPDATE UI ONLY AFTER SUCCESS
            setBills((prev) => prev.filter((b) => b.id !== id));

            if (selected?.id === id) {
            setSelected(null);
            }

            alert("Bill deleted successfully");

        } catch (err) {
            console.error(err);
            alert("Delete failed");
        }
        };

  // 🔥 FIXED PDF
  const downloadPDF = (bill) => {
    const doc = new jsPDF();

    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, 210, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("SMARTBILL ELECTRICITY", 14, 15);

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(11);
    doc.text(`Bill ID: ${bill.id}`, 140, 35);
    doc.text(`Date: ${new Date(bill.created_at).toLocaleDateString()}`, 140, 42);

    doc.rect(14, 45, 182, 35);

    doc.text("Customer Details", 16, 52);

    doc.setFontSize(10);
    doc.text(`Name: ${user?.first_name || "N/A"} ${user?.lastname || ""}`, 16, 60);
    doc.text(`IVRS: ${user?.ivrs || "N/A"}`, 16, 66);
    doc.text(`Category: ${bill.category}`, 100, 60);
    doc.text(`Units: ${bill.units} kWh`, 100, 66);

    if (bill.category === "industrial") {
      doc.text(`Demand: ${bill.demand} kVA`, 16, 72);
    }

    autoTable(doc, {
      startY: 90,
      head: [["Description", "Amount (₹)"]],
      body: [
        ["Energy Charge", format(bill.energy_charge)],
        ["FCA", format(bill.fca)],
        ["FPPAS", format(bill.fppas)],
      ],
      headStyles: { fillColor: [99, 102, 241] },
    });

    const y = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: ₹ ${format(bill.total)}`, 140, y);

    doc.save(`Bill-${bill.id}.pdf`);
  };

  return (
    <div className="h-full flex flex-col">

      <h2 className="text-xl font-semibold mb-6">Bill History</h2>

      <div className="flex gap-6 h-full">

        {/* LEFT */}
        <div className="w-1/3 bg-white rounded-xl shadow p-4 overflow-y-auto">

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : bills.length === 0 ? (
            <p className="text-gray-500 text-sm">No bills yet</p>
          ) : (
            bills.map((bill) => (
              <div
                key={bill.id}
                onClick={() => setSelected(bill)}
                className={`p-3 mb-3 rounded-lg cursor-pointer border transition
                  ${selected?.id === bill.id
                    ? "bg-indigo-100 border-indigo-300"
                    : "hover:bg-indigo-50"
                  }`}
              >
                <p className="font-medium">
                  ₹ {format(bill.total)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(bill.created_at).toLocaleDateString()} • {bill.category}
                </p>
              </div>
            ))
          )}

        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">

          {!selected ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a bill to view details
            </div>
          ) : (
            <div>

              <div className="flex justify-between mb-6">
                <h3 className="text-lg font-semibold text-indigo-600">
                  ⚡ SmartBill
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(selected.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">

                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">
                    {user?.first_name} {user?.lastname}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">IVRS</p>
                  <p className="font-medium">{user?.ivrs}</p>
                </div>

                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium capitalize">
                    {selected.category}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Units</p>
                  <p className="font-medium">
                    {selected.units} kWh
                  </p>
                </div>

              </div>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span>Energy</span>
                  <span>₹ {format(selected.energy_charge)}</span>
                </div>

                <div className="flex justify-between">
                  <span>FCA</span>
                  <span>₹ {format(selected.fca)}</span>
                </div>

                <div className="flex justify-between">
                  <span>FPPAS</span>
                  <span>₹ {format(selected.fppas)}</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg text-indigo-600">
                  <span>Total</span>
                  <span>₹ {format(selected.total)}</span>
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => downloadPDF(selected)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Download PDF
                </button>

                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}