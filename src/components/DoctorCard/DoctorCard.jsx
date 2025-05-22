// DoctorCard.jsx
import React from "react";

const DoctorCard = ({ name, phone, casesResolved }) => {
  return (
    <div className="relative w-64 h-64 rounded-3xl border p-4 flex flex-col justify-between items-center 
                    opacity-60 cursor-not-allowed hover:opacity-100 hover:backdrop-blur-sm 
                    transition duration-300 group bg-white shadow-md">
      
      <div className="absolute top-2 right-2 bg-yellow-300 text-xs px-2 py-1 rounded-full  md:opacity-0  md:group-hover:opacity-100 transition">
        Coming Soon
      </div>

      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      
      <div className="text-center mt-2">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{phone}</p>
        <div className="text-yellow-500 text-lg mt-1">
          {"★".repeat(5)}
        </div>
        <p className="text-xs mt-1">{casesResolved}+ case resolved</p>
      </div>

      <button 
        className="mt-2 px-4 py-1 border rounded-md text-sm bg-gray-100 text-gray-500"
        disabled
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
