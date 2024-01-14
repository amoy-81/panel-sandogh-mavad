import React, { useState } from "react";

function GuidDropdown({title , body}) {
    const [isOpen , setIsOpen] = useState(false)

  return (
    <div className=" border-b border-g-1">
      <h2>
        <button
            onClick={() => setIsOpen(prev => !prev)}
          className="flex z-40 items-center justify-between w-full p-5 font-medium text-left text-titlesColor hover:bg-p-2 rounded-t-xl"
        >
          <span>{title}</span>
          <svg
            className={`w-6 h-6 ${isOpen ? `rotate-180` : `rotate-0`} shrink-0`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div className={` transition overflow-hidden ${isOpen ? `h-full` : `h-0`}`}>
        <div className={`p-5 transition ${isOpen ? `translate-y-0` : `-translate-y-full`}`}>
          <p className="text-gray-600 justify-items-stretch">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default GuidDropdown;
