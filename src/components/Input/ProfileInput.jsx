import React from "react";
import { RiPencilFill } from "react-icons/ri";

function ProfileInput({
  register,
  validation,
  error,
  label,
  name,
  type,
  placeholder,
}) {
  return (
    <div
      className={
        error
          ? "relative mt-3 ml-2 w-80 max-md:w-full border border-red-500 rounded-2xl p-2 overflow-hidden  h-17 "
          : "relative mt-3 ml-2 w-80 max-md:w-full border rounded-2xl p-2 overflow-hidden  h-17 "
      }
    >
      <p className="font-bold text-xs">
        {label}{" "}
        <span className=" font-normal text-red-500">
          {error?.message.length > 0
            ? `* ${error?.message}`
            : error?.type === "minLength" || error?.type === "maxLength"
            ? `* تعداد کاراکتر نامعتبر`
            : ""}
        </span>
      </p>
      <input
        {...register(name, validation)}
        type={type}
        id={name}
        name={name}
        className="outline-none placeholder:text-xs border-0 w-full"
      />
    </div>
  );
}

export default ProfileInput;
