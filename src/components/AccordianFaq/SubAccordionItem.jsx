import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SubAccordionItem = ({ title, author, link, summary }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-4 border-l-2 border-indigo-200 pl-4 py-2">
      <button
        className="w-full flex justify-between items-center text-left font-medium text-indigo-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 text-sm space-y-1">
          <p><strong>Author:</strong> {author}</p>
          <p><strong>Summary:</strong> {summary}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read Full Article
          </a>
        </div>
      )}
    </div>
  );
};

export default SubAccordionItem;
    