import React from "react";
import { GoX } from "react-icons/go";

function FilesInput({
  name,
  title,
  mainObject,
  currentValue,
  setCurrentValue,
  loading,
  error,
  prossesPercent,
}) {
  const docChangeFile = (e) => {
    const filesEvent = e.target.files;
    const filesList = [];
    filesList.push({ file: filesEvent[0] });

    // let arryasli = [];
    // if (mainObject[e.target.name] !== null) {
    //   arryasli = mainObject[e.target.name];
    // }
    // const finalArry = filesList.concat(arryasli);
    setCurrentValue({
      ...mainObject,
      [e.target.name]: filesList,
    });
  };

  const removeHandler = (e) => {
    let arryasli = [];
    if (mainObject[e.name] !== null) {
      arryasli = mainObject[e.name];
    }
    arryasli.splice(e.index, 1);
    if (arryasli.length > 0) {
      setCurrentValue({
        ...mainObject,
        [e.name]: arryasli,
      });
    } else {
      setCurrentValue({
        ...mainObject,
        [e.name]: null,
      });
    }
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
        {currentValue?.length > 0 &&
          currentValue.map(({ file }, index) => (
            <div key={index} className=" flex items-center gap-2">
              <GoX
                className=" hover:text-red-500 cursor-pointer"
                onClick={() => removeHandler({ index: index, name: name })}
              />
              <div className=" flex w-full">
                <p className=" w-full break-normal">
                  نام فایل :{file.name.slice(0, 25)}...
                </p>
                <span className={(file.size / 1000000).toFixed(2) >= 15 ? "text-redColor w-24 " : " text-green-600 w-24 "}>{(file.size / 1000000).toFixed(2)} {"Mb"}</span>
              </div>
            </div>
          ))}
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
        accept=".zip, .pdf, .jpg"
        name={name}
        onChange={docChangeFile}
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

export default FilesInput;
