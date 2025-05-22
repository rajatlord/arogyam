// DoctorList.jsx
import React from "react";
import DoctorCard from "./DoctorCard";

const doctors = [
  { name: "Rajat mathur", phone: "+91 XXX-XXX-XXXX", casesResolved: 20 },
  { name: "Rajat mathur", phone: "+91 XXX-XXX-XXXX", casesResolved: 18 },
  { name: "Rajat mathur", phone: "+91 XXX-XXX-XXXX", casesResolved: 17 },
  { name: "Rajat mathur", phone: "+91 XXX-XXX-XXXX", casesResolved: 10 },
  { name: "Rajat mathur", phone: "+91 XXX-XXX-XXXX", casesResolved: 15 },
];

const DoctorList = () => {
  return (
    <div className="flex gap-4 w-max">
      {doctors.map((doc, index) => (
        <div key={index} className=" min-w-[70px] md:min-w-[200px]">
          <DoctorCard {...doc} />
        </div>
      ))}
    </div>
  );
};

export default DoctorList;

// flex gap-6 py-4 px-2 md:justify-center min-w-[600px] sm:min-w-full
