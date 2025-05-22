import NavbarBeforeLogin from "../components/NavbarBeforeLogin";
import articles from "../assets/landing-page-img/articles.png";
import journal from "../assets/landing-page-img/journal.png";
import mood from "../assets/landing-page-img/mood.png";
import SignUpModal from "../components/SignUpModal";
import { useState } from "react";

function Landing() {
  const [showSignup, setShowSignup] = useState(false);

  const features = [
    { title: "Mood Tracker", desc: "Understand and monitor your daily emotions.", img: mood },
    { title: "Guided Journaling", desc: "Daily prompts designed to heal and empower.", img: journal },
    { title: "Expert Articles", desc: "Bite-sized reads for a healthier mind.", img: articles },
  ];

  return (
    <>
      <NavbarBeforeLogin />
      <main className="px-6 py-10 text-gray-800 font-inter">
        {showSignup && <SignUpModal closeModal={() => setShowSignup(false)} />}

        {/* Hero Section */}
        <section id="get-started" className="flex flex-col items-center justify-center text-center space-y-6 min-h-[70vh]">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Mental Health <br /> Matters with <span className="text-blue-600">Arogyam</span>
          </h1>
          <p className="text-lg max-w-xl">
            Start your healing journey with science-backed tools, journaling, and community support. Simple. Private. Effective.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            onClick={() => setShowSignup(true)}>
            Get Started
          </button>
        </section>

        {/* Features */}
        <section id="features" className="mt-20 text-center space-y-10">
          <h2 className="text-3xl font-semibold">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map(({ title, desc, img }, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-center">
                <img src={img} alt={`${title} icon`} className="w-45 h-45 mb-4 object-contain" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-700">
            Arogyam is built with the belief that mental health is a right, not a luxury. Our mission is to create safe, accessible, and empowering spaces for every mind.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Is Arogyam free to use?</h4>
              <p className="text-sm text-gray-600">Yes, core features are free forever. Premium tools are optional.</p>
            </div>
            <div>
              <h4 className="font-semibold">Is my data private?</h4>
              <p className="text-sm text-gray-600">Absolutely. Everything stays encrypted and secure.</p>
            </div>
            <div>
              <h4 className="font-semibold">How do I get started?</h4>
              <p className="text-sm text-gray-600">Just hit the Get Started button and sign up — it’s that easy.</p>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="mt-24 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">We’d love to hear from you. Reach us at:</p>
          <a href="mailto:support@arogyam.app" className="text-blue-600 underline hover:text-blue-800">
            support@arogyam.app
          </a>
        </section>

        {/* Founder (Optional) */}
        <section id="founder" className="mt-24 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Founder</h2>
          <p className="text-gray-700">
            Meet the passionate minds behind Arogyam. Dedicated to creating change, one mindful step at a time.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-32 py-6 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} Arogyam. All rights reserved.
        </footer>
      </main>
    </>
  );
}

export default Landing;
