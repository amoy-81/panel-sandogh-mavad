import React, { useContext, useEffect, useState } from "react";
import { TashilatContext } from "../../../contexts/Tashilat.Provider";
import { VS2shareholders } from "../../../helper/validation/VS2shareholders";

export default function S2Residences({ showAllErr, setSendAccept }) {
  const { stepTwo, setStepTwo } = useContext(TashilatContext);

  // for Validation
  const [err, setErr] = useState([{ name: "پر کنید" }]);
  const [showErr, setShowErr] = useState([]);
  // for Validation
  console.log(err);
  useEffect(() => {
    if (showAllErr) {
      showErr.map((i, index) => {
        const arr = showErr;
        const newObj = {
          name: true,
          position: true,
          address: true,
        };
        arr[index] = newObj;
        // console.log(arr);
        setShowErr(arr);
      });
    }
    // console.log("hhhhhhhh");
    console.log(showErr);

    setErr(VS2shareholders(stepTwo.residences));
    setSendAccept((prev) => ({
      ...prev,
      residences: VS2shareholders(stepTwo.residences),
    }));
  }, [showAllErr, stepTwo]);

  // for Validation
  const focusHandler = (e, index) => {
    if (showErr[index]) {
      const arr = showErr;
      arr[index] = { ...arr[index], [e.target.name]: true };
      setShowErr(arr);
    } else if (showErr[index] === undefined) {
      const arr = showErr;
      arr[arr.length] = { [e.target.name]: true };
      setShowErr(arr);
    }
    setErr(VS2shareholders(stepTwo.residences));
    setSendAccept((prev) => ({
      ...prev,
      residences: VS2shareholders(stepTwo.residences),
    }));
  };

  const changeHandler = (e) => {
    setStepTwo((prevState) => {
      const updated = prevState.residences.map((item, index) => {
        if (index === parseInt(e.target.id)) {
          return {
            ...item,
            [e.target.name]: e.target.value,
          };
        }
        return item;
      });
      return {
        ...prevState,
        residences: updated,
      };
    });
    console.log(stepTwo.residences[e.target.id]);
  };
  return (
    <>
      <div className=" py-6 mt-4">
        <p className="text-lg font-extrabold">
          آدرس محل سكونت اعضای هیئت مدیره فعلي شرکت :{" "}
        </p>
      </div>

      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden text-center">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 ">رديف </th>
              <th className="bg-white p-3 ">نام و نام خانوادگي</th>
              <th className="bg-white p-3 ">سمت </th>
              <th className="bg-white p-3 ">نشاني محل سکونت</th>
            </tr>
          </thead>
          <tbody>
            {stepTwo.residences.length > 0 &&
              stepTwo.residences.map((item, index) => (
                <tr className="bg-white  border-b">
                  <td className="p-4 text-xs text-gray-800 font-bold">
                    {index}
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        className={
                          err[index] &&
                          err[index].name &&
                          showErr[index] &&
                          showErr[index].name
                            ? "border border-red-300 rounded-xl w-32"
                            : "border border-gray-300 rounded-xl w-32"
                        }
                        onChange={changeHandler}
                        value={stepTwo.residences[index].name}
                        name="name"
                        id={index}
                        onFocus={(e) => focusHandler(e, index)}
                      />
                    </div>
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        className={
                          err[index] &&
                          err[index].position &&
                          showErr[index] &&
                          showErr[index].position
                            ? "border border-red-300 rounded-xl w-32"
                            : "border border-gray-300 rounded-xl w-32"
                        }
                        onChange={changeHandler}
                        value={stepTwo.residences[index].position}
                        name="position"
                        id={index}
                        onFocus={(e) => focusHandler(e, index)}
                      />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex flex-col items-center">
                      <textarea
                        type="text"
                        className={
                          err[index] &&
                          err[index].address &&
                          showErr[index] &&
                          showErr[index].address
                            ? "border border-red-300 rounded-xl w-full"
                            : "border border-gray-300 rounded-xl w-full"
                        }
                        onChange={changeHandler}
                        value={stepTwo.residences[index].address}
                        name="address"
                        id={index}
                        onFocus={(e) => focusHandler(e, index)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="">
              <td className="bg-white text-right" colSpan="4">
                <button
                  className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                  onClick={() => {
                    setStepTwo((prev) => ({
                      ...prev,
                      residences: [
                        ...prev.residences,
                        {
                          name: "",
                          position: "",
                          address: "",
                        },
                      ],
                    }));
                  }}
                >
                  {" "}
                  افزودن ردیف{" "}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
