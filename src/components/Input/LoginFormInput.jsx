import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function LoginFormInput({
  register,
  validation,
  error,
  label,
  name,
  type,
  placeholder,
}) {
  const [showPass, setShowPass] = useState(false);
  const [focus, setFocus] = useState(false);

  if (type !== "password")
    return (
      <div className="relative text-right">
        <label
          htmlFor={name}
          className={`mr-3 transition text-sm font-bold ${
            focus ? "text-s-5" : " text-g-6"
          } tracking-wide`}
        >
          {label}{" "}
          <span className="text-red-500 font-extralight text-xs">
            {error?.message.length > 0
              ? `* ${error?.message}`
              : error?.type === "minLength"
              ? `* تعداد کاراکتر نامعتبر`
              : ""}
          </span>
        </label>
        <input
          className={
            error
              ? ` w-full transition mt-2 text-red-500 text-base px-4 py-2 border border-red-500 bg-[#E8F0F833] focus:outline-none rounded-xl`
              : ` w-full transition mt-2 ${
                  focus ? "text-s-5" : " text-s-4"
                } text-base px-4 py-2 border border-s-2 bg-[#E8F0F833] placeholder-s-4 focus:outline-none rounded-xl focus:border-s-5`
          }
          {...register(name, validation)}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </div>
    );
  if (type === "password") {
    return (
      <div className="relative text-right">
        <label
          htmlFor={name}
          className={`mr-3 transition text-sm font-bold ${
            focus ? "text-s-5" : " text-g-6"
          } tracking-wide`}
        >
          {label}{" "}
          <span className="text-red-500 font-extralight text-xs">
            {error?.message.length > 0
              ? `* ${error?.message}`
              : error?.type === "minLength"
              ? `* رمزعبور کوتاه میباشد`
              : ""}
          </span>
        </label>
        <div className="relative flex items-center">
          <input
            className={
              error
                ? ` w-full transition mt-2 text-red-500 text-base px-4 py-2 border border-red-500 bg-[#E8F0F833] focus:outline-none rounded-xl`
                : ` w-full transition mt-2 ${
                    focus ? "text-s-5" : " text-s-4"
                  } text-base px-4 py-2 border border-s-2 bg-[#E8F0F833] placeholder-s-4 focus:outline-none rounded-xl focus:border-s-5`
            }
            {...register(name, validation)}
            type={showPass ? "text" : "password"}
            id={name}
            name={name}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <div
            className=" absolute left-0 h-full flex flex-col pt-2 justify-center pl-3 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <AiOutlineEyeInvisible color="" className=" fill-s-3 w-6 h-6" />
            ) : (
              <AiOutlineEye color="" className=" fill-s-3 w-6 h-6" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LoginFormInput;
