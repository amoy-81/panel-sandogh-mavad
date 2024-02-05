import React from "react";
import { GoX } from "react-icons/go";

function SingleFileInput({
  name,
  title,
  currentValue,
  setCurrentValue,
  loading,
  error,
  prossesPercent,
  cancelReq,
}) {
  const removeHandler = (fildeName) => {
    setCurrentValue((prev) => ({ ...prev, [fildeName]: null }));
  };
  return (
    <div
      className={
        error
          ? " w-full border border-red-600 p-2 rounded-xl text-g-5 "
          : " w-full border border-[#D2D1D4] p-2 rounded-xl text-g-5 "
      }
    >
      <div className=" w-full flex justify-between p-2">
        <p className=" text-xs text-backColor">{title}</p>
      </div>
      <div className=" w-full">
        {currentValue && (
          <div className=" flex items-center gap-2">
            <GoX
              className=" hover:text-red-500 cursor-pointer"
              onClick={() => (loading ? cancelReq() : removeHandler(name))}
            />
            <div className=" flex w-full">
              <p className=" w-full break-normal">
                نام فایل :{currentValue.name.slice(0, 25)}...
              </p>
              <span
                className={
                  (currentValue.size / 1000000).toFixed(2) >= 15
                    ? "text-redColor w-24 "
                    : " text-green-600 w-24 "
                }
              >
                {(currentValue.size / 1000000).toFixed(2)} {"Mb"}
              </span>
            </div>
          </div>
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
        accept=".zip, .pdf, .jpg"
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

export default SingleFileInput;
