import React from "react";
import { GoX } from "react-icons/go";

function FileInput({
  name,
  title,
  currentValue,
  setCurrentValue,
  loading,
  prossesPercent,
}) {
  return (
    <div className=" w-full border border-g-4 p-2 rounded-xl text-g-5 ">
      <div className=" w-full flex justify-between p-2">
        <p className=" text-xs text-backColor">{title}</p>
        <GoX />
      </div>
      <div className=" w-full">
        {currentValue && (
          <p className=" w-full break-normal">
            نام فایل :{currentValue.name.slice(0, 25)}...
          </p>
        )}
      </div>
      {!loading && (
        <label
          htmlFor={name}
          className={
            currentValue ? " text-p-6 text-sm" : " text-secondary text-sm"
          }
        >
          {currentValue
            ? "برای تغییر فایل کلیک کنید"
            : "برای انتخاب فایل کلیک کنید"}
        </label>
      )}
      <input
        className=" hidden"
        type="file"
        id={name}
        name={name}
        onChange={(e) =>
          setCurrentValue((prev) => ({ ...prev, [name]: e.target.files[0] }))
        }
      />
      {/* prosses bar */}
      <div className=" w-full flex justify-center gap-2 items-center">
        {loading && (
          <div className="w-2/3 bg-g-2 rounded-full h-2.5">
            <div className="w-full">
              <div
                className=" bg-secondary h-2.5 rounded-full"
                style={{ width: `${prossesPercent}%` }}
              ></div>
            </div>
          </div>
        )}
        {loading && <span>{prossesPercent.toFixed(1)}%</span>}
      </div>
    </div>
  );
}

export default FileInput;
