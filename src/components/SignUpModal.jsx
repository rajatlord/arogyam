import { useState, useRef, useEffect } from "react";
import { useAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";
// img import 
import singup from "../assets/svgs/singup.svg"

// icon import 
import { User, AtSign, Mail, Lock, Calendar } from 'lucide-react';

const SignUpModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const emailRef = useRef(null);
  const closeRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState("");

  useEffect((e) => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name, age, userName);
      navigate("/home/");
      closeModal();
    } catch (err) {
      setError(err.message);

      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (closeRef.current && !closeRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-500">
      <form
        onSubmit={handleSignup}
        ref={closeRef}
        className="bg-white p-6 md:rounded-2xl shadow w-100 md:min-h-[100px] h-[650px]"
      >
        <h2 className=" text-3xl md:text-4xl text-center tracking-tight  mb-0">Sign up</h2>
        <h2 className="text-center md:text-xl pt-0 text-[#6e6e80]">A Home for wellness join us </h2>
        <div className="flex justify-center p-0 m-0" >
      <img src={singup} alt="Logo" className="h-50 w-50" />
    </div>
        <div className="relative ">
         <User className="absolute left-2 top-[25px] -translate-y-[14px] text-gray-400" size={20} />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your Name"
          className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
           error && !name ? "border-red-500" : "border-gray-300"
          } `}
        />
      </div>

       <div className="relative">
        <AtSign className="absolute left-2 top-[22px] -translate-y-1/2 text-gray-400" size={20} />
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="set your userName"
          className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
            error && !email ? "border-red-500" : "border-gray-300"
          } `}
        />
        </div>

         <div className="relative">
        <Calendar className="absolute left-2 top-[21px] -translate-y-1/2 text-gray-400" size={20} />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          type="number"
          placeholder="Enter your Age"
          className={`w-full mb-3 p-2 border pl-[30px] rounded-2xl ${
            error && !email ? "border-red-500" : "border-gray-300"
          } `}
        />
        </div>

         <div className="relative">
        <Mail className="absolute left-2 top-[21px] -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
          className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
            error && !email ? "border-red-500" : "border-gray-300"
          } `}
        />
        </div>


          <div className="relative">
        <Lock className="absolute left-2 top-[21px] -translate-y-1/2 text-gray-400" size={20} />   
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          className={`w-full mb-3 p-2 pl-[30px] border rounded-2xl ${
            error && !password ? "border-red-500" : "border-gray-300"
          } `}
        />
        </div> 

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl transition text-white p-2"
        >
          Sign UP
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm hover:text-gray-600"
          onClick={closeModal}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
