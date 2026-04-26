import { useState } from "react";
import { Zap, Calculator, RotateCcw } from "lucide-react";
import { saveBill } from "../services/api";

export default function BillCalculator() {
  const [category, setCategory] = useState("domestic");
  const [units, setUnits] = useState("");
  const [demand, setDemand] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const FCA_RATE = 0.34;
  const FPPAS_PERCENT = -0.0063;

  // ✅ SAFE FORMAT
  const format = (val) => Number(val || 0).toFixed(2);

  // ✅ CALCULATIONS
  const domesticCalc = (u) => {
    if (u <= 50) return u * 4.71;
    if (u <= 150) return 50 * 4.71 + (u - 50) * 5.67;
    if (u <= 300)
      return 50 * 4.71 + 100 * 5.67 + (u - 150) * 7.05;

    return (
      50 * 4.71 +
      100 * 5.67 +
      150 * 7.05 +
      (u - 300) * 7.24
    );
  };

  const commercialCalc = (u) => u * 8.5;
  const industrialCalc = (u, d) => u * 6.5 + d * 250;

  const calculateBill = async () => {
    setError("");

    const u = Number(units);
    const d = Number(demand);

    // ✅ VALIDATION
    if (!u || u <= 0) {
      return setError("Enter valid units");
    }

    if (category === "industrial" && (!d || d <= 0)) {
      return setError("Enter valid demand");
    }

    try {
      setLoading(true);

      let energy = 0;

      if (category === "domestic") energy = domesticCalc(u);
      if (category === "commercial") energy = commercialCalc(u);
      if (category === "industrial") energy = industrialCalc(u, d);

      const fca = u * FCA_RATE;
      const fppas = energy * FPPAS_PERCENT;
      const total = energy + fca + fppas;

      // ✅ LOCAL CALCULATED DATA
      const billData = {
        category,
        units: u,
        demand: category === "industrial" ? d : null,
        energy_charge: energy,
        fca,
        fppas,
        total,
      };

      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not logged in");
        return;
      }

      // ✅ SAVE TO BACKEND (only for DB)
      const res = await saveBill(billData, token);

      if (!res || res.error) {
        setError(res?.error || "Failed to save bill");
        return;
      }

      // 🔥 IMPORTANT FIX (MAIN BUG SOLUTION)
      // USE LOCAL CALCULATION, NOT BACKEND RESPONSE
      setResult(billData);

    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUnits("");
    setDemand("");
    setResult(null);
    setError("");
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#f5f7fb] to-[#eef2ff]">

      <div className="w-full max-w-2xl rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border p-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center">
            <Zap size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Smart Electricity Calculator
            </h2>
            <p className="text-sm text-gray-500">
              Accurate bill generation system
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        {/* FORM */}
        <div className="grid gap-5">

          <div>
            <label className="label">Consumer Type</label>
            <select
              className="input-premium"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="domestic">🏠 Domestic</option>
              <option value="commercial">🏢 Commercial</option>
              <option value="industrial">🏭 Industrial</option>
            </select>
          </div>

          <div>
            <label className="label">Units</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="input-premium"
              placeholder="Enter units"
            />
          </div>

          {category === "industrial" && (
            <div>
              <label className="label">Demand (kVA)</label>
              <input
                type="number"
                value={demand}
                onChange={(e) => setDemand(e.target.value)}
                className="input-premium"
              />
            </div>
          )}

        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateBill}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            {loading ? "Calculating..." : <><Calculator size={18}/> Calculate</>}
          </button>

          <button
            onClick={resetForm}
            className="px-4 bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            <RotateCcw size={18}/>
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-6 bg-indigo-50 p-5 rounded-xl">

            <h3 className="font-semibold mb-3">Bill Breakdown</h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span>Energy</span>
                <span>₹ {format(result.energy_charge)}</span>
              </div>

              <div className="flex justify-between">
                <span>FCA</span>
                <span>₹ {format(result.fca)}</span>
              </div>

              <div className="flex justify-between">
                <span>FPPAS</span>
                <span>₹ {format(result.fppas)}</span>
              </div>

              <div className="flex justify-between font-bold text-indigo-600 text-lg pt-2">
                <span>Total</span>
                <span>₹ {format(result.total)}</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}