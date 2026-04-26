import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Smart Electricity Tracking ⚡",
    desc: "Monitor your energy usage and reduce unnecessary costs with real-time insights.",
  },
  {
    title: "AI Bill Prediction 🔮",
    desc: "Predict your upcoming bills using intelligent algorithms.",
  },
  {
    title: "Advanced Analytics 📊",
    desc: "Understand your consumption patterns with powerful visual dashboards.",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-900 text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-400 opacity-20 blur-[120px] top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-400 opacity-20 blur-[120px] bottom-10 right-10"></div>

      {/* CONTENT */}
      <div className="relative text-center max-w-2xl px-6">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              {slides[index].title}
            </h1>

            <p className="text-lg text-gray-200 mb-6">
              {slides[index].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA BUTTONS */}
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
          >
            Learn More
          </a>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                i === index ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}