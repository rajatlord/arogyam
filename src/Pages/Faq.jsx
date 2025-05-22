import DoctorList from "../components/DoctorCard/DoctorList";
import FaqAccordion from "../components/AccordianFaq/FaqAccordion";

function Faq() {
  return (
    <section className="bg-[#F9F9F9]">
      <h1 className="text-center pt-10 text-2xl mb-[15px]">Doctor's contact</h1>
      <div className="w-full flex justify-center">
        <div className="w-[90%] md:w-[70%] overflow-x-auto scroll-smooth scrollbar-hide">
          <DoctorList />
        </div>
      </div>
     <div className="w-full flex justify-center">
        <div className="w-[90%] md:w-[70%] overflow-x-auto scroll-smooth scrollbar-hide">
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}

export default Faq;
