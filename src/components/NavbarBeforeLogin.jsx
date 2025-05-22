import { useState } from "react";
import logo from "../assets/logo.png";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function NavbarBeforeLogin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navLinks = [
    { name: "Get Started", id: "get-started" },
    { name: "Features", id: "features" },
    { name: "Contact Us", id: "contact" },
    { name: "FAQ", id: "faq" },
    { name: "About Us", id: "about" },
    { name: "Founder", id: "founder" }, // Make sure you add this section in Landing
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Close mobile menu after click
    }
  };

  return (
    <nav className="px-4 py-3 border-b border-gray-200 flex justify-between items-center relative inter-bold">
      {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
      {showSignup && <SignUpModal closeModal={() => setShowSignup(false)} />}

      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
      </div>

      <div className="hidden lg:flex gap-4 items-center">
        {navLinks.map(({ name, id }, index) => (
          <button
            key={index}
            onClick={() => id === "get-started" ? setShowSignup(true) : scrollToSection(id)}
            className="px-3 py-1 hover:bg-gray-200 transition-colors duration-200 rounded-md text-sm"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="hidden lg:flex gap-2 items-center">
        <button className="px-3 py-1 text-sm font-semibold" onClick={() => setShowLogin(true)}>Login</button>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-md font-semibold" onClick={() => setShowSignup(true)}>
          Fix Mental Health
        </button>
      </div>

      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col items-start p-4 space-y-2 z-50 lg:hidden">
          {navLinks.map(({ name, id }, index) => (
            <button
              key={index}
              onClick={() => id === "get-started" ? setShowSignup(true) : scrollToSection(id)}
              className="px-3 py-2 w-full text-left hover:bg-gray-100 rounded-md text-sm"
            >
              {name}
            </button>
          ))}
          <hr className="w-full border-gray-200" />
          <button onClick={() => setShowLogin(true)} className="px-3 py-2 w-full text-sm">Login</button>
          <button className="px-4 py-2 bg-black text-white text-sm rounded-md w-full text-center" onClick={() => setShowSignup(true)}>
            Fix Mental Health
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavbarBeforeLogin;
