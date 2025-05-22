// this is not responsive yet and loading sipneer is not there

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";

// svg or imge
import logging from "../assets/svgs/logging.svg"
// icon import 
import { User, AtSign, Mail, Lock, Calendar } from 'lucide-react';

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const closeRef = useRef(null);
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // handleing eascape key
  useEffect((e) => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

 useEffect(() => {
  const handleOutsideClick = (e) => {
    if (closeRef.current && !closeRef.current.contains(e.target)) {
      closeModal();
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      closeModal();
      navigate("/homelayout");
    } catch (err) {
      setError(err.message);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-500">
      <form
        ref={closeRef}
        onSubmit={handleLogin}
        className="bg-white p-6 md:rounded-2xl shadow w-100 h-[500px]"
      >
        <h2 className="text-3xl md:text-4xl text-center tracking-tight  mb-0">Login</h2>
        <div className="flex justify-center p-0 m-0" >
             <img src={logging} alt="Logo" className="h-50 w-50" />
           </div>
           <div className="relative">
        <Mail className="absolute left-2 top-[21px] -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="email"
          value={email}
          ref={emailRef}
          placeholder="Email"
          className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
            error && !email ? "border-red-500" : "border-gray-300"
          } `}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="relative">
        <Lock className="absolute left-2 top-[21px] -translate-y-1/2 text-gray-400" size={20} /> 
        <input
          type="password"
          value={password}
          placeholder="Password"
           className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
            error && !password ? "border-red-500" : "border-gray-300"
          } `}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl transition text-white p-2"
        >
          Login
        </button>
        <button
          type="button"
         className="w-full mt-2 text-sm hover:text-gray-600"
          onClick={closeModal}
        >
          cancel
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
