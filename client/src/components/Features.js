import { Zap, BarChart3, Brain } from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-100 to-white"
    >
      {/* TITLE */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold mb-3">
          Powerful Features ⚡
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Everything you need to track, analyze and optimize your electricity usage.
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {/* CARD 1 */}
        <div className="feature-card">
          <Zap className="icon" />
          <h3>Smart Bill Calculator</h3>
          <p>
            Calculate electricity bills instantly with accurate unit-based pricing.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="feature-card">
          <BarChart3 className="icon" />
          <h3>Analytics Dashboard</h3>
          <p>
            Visualize your energy usage with interactive charts and insights.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="feature-card">
          <Brain className="icon" />
          <h3>AI Prediction</h3>
          <p>
            Predict your future electricity bills using smart algorithms.
          </p>
        </div>

      </div>
    </section>
  );
}