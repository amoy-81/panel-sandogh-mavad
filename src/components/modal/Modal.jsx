import React from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, close, title, body, children }) {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            dir="rtl"
            onClick={() => close(false)}
            className=" fixed z-50 bg-[rgba(0,0,0,0.2)] backdrop-blur-[1px] w-full h-screen top-0 flex justify-center items-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" bg-white w-3/6 max-lg:w-5/6 rounded-lg max-h-[90vh] overflow-auto sc text-titlesColor p-6"
            >
              <div className="flex justify-between ">
                <h2 className=" font-bold">{title}</h2>
                <button onClick={() => close(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#CF8321"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className=" text-sm text-g-6 mt-2">{body}</div>
              <div className="p-1">
                {children}
              </div>
            </div>
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
}

export default Modal;
