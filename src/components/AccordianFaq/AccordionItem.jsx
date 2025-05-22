// import React, { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

// const AccordionItem = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border-b border-gray-300">
//       <button
//         className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-800"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//         {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//       </button>
//       {isOpen && (
//         <div className="pb-4 text-gray-600">
//           {typeof content === "string" ? (
//             <p>{content}</p>
//           ) : (
//             <ul className="list-disc ml-6 space-y-2">
//               {content.map((item, idx) => (
//                 <li key={idx}>{item}</li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccordionItem;

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SubAccordionItem from "./SubAccordionItem";

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="pb-4">
          {Array.isArray(content) ? (
            <div className="space-y-2">
              {content.map((subItem, idx) => (
                <SubAccordionItem
                  key={idx}
                  title={subItem.title}
                  author={subItem.author}
                  summary={subItem.summary}
                  link={subItem.link}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">{content}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
