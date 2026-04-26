export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-[#0f172a] to-[#020617] text-white"
    >

      {/* TOP TITLE */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold mb-3">
          Get Started Today
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Ready to manage your electricity smarter? Contact us for a personalized demo.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT: FORM */}
        <div className="bg-white text-black rounded-2xl p-6 shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Get in Touch
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Full Name"
              className="input-light"
            />
            <input
              placeholder="Email Address"
              className="input-light"
            />
          </div>

          <textarea
            rows="5"
            placeholder="Tell us about your requirements..."
            className="input-light mb-4"
          />

          <button className="w-full bg-[#0f172a] text-white py-3 rounded-lg hover:bg-black transition">
            Submit
          </button>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col justify-center">

          <h2 className="text-2xl font-semibold mb-6">
            Why Choose SmartBill?
          </h2>

          <ul className="space-y-3 text-gray-300 mb-8">
            <li>✔ Accurate bill calculations</li>
            <li>✔ Smart analytics dashboard</li>
            <li>✔ Future bill prediction</li>
            <li>✔ Easy to use interface</li>
          </ul>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl">

            <h3 className="font-semibold mb-2">
              Ready to Get Started?
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Contact us and start optimizing your electricity usage today.
            </p>

            <p className="text-sm">📧 support@smartbill.com</p>
            <p className="text-sm">📞 +91 9876543210</p>
            <p className="text-sm">🕒 Mon - Fri, 9AM - 6PM</p>

          </div>
        </div>

      </div>
    </section>
  );
}