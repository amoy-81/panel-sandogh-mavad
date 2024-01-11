import React from "react";
import img from '../../../assets/imges/ViewRequests/x.png'
const Button = ({ type }) => {
  const renderButton = () => {
    if (type === "assign") {
      return (
        <button className="py-1 px-2 text-c-13 bg-c-14 rounded">اختصاص</button>
      );
    }
    if (type === "close") {
      return (
        <button className="text-c-9 border border-c-9 rounded w-c-4 h-c-4 flex justify-center items-center">
          <img className="" src={img} alt="" />
        </button>
      );
    }
  };
  return <>{renderButton()}</>;
};

export default Button;
