import React from "react";

function ShowFinalStep({ data, close }) {
  console.log(data);
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
      <div className="">
        <div className="tashilat-submit-form flex flex-col items-center mx-auto my-6 bg-white rounded-xl p-6  max-h-[95vh] overflow-y-auto">
          <span className="font-semibold text-sm text-gray-600    ">
            نام و نام خانوادگی مدیر عامل
          </span>
          <p className="rounded-2xl bg-transparent text-gray-700 border-b border-gray-600 my-2 shadow-lg w-full text-center">
            {data[0].name}
          </p>

          <span className="font-semibold text-sm text-gray-600    ">
            مبلغ درخواستی{" "}
          </span>
          <p className="rounded-2xl bg-transparent text-gray-700 border-b border-gray-600 my-2 shadow-lg w-full text-center">
            {data[0].amount}
          </p>

          <span className="font-semibold text-sm text-gray-600    ">
            عنوان تسهیلات
          </span>
          <p className="rounded-2xl bg-transparent text-gray-700 border-b border-gray-600 my-2 shadow-lg w-full text-center">
            {data[0].title}
          </p>

          <span className="font-semibold text-sm text-gray-600    ">
            منظور از درخواست
          </span>
          <p className="rounded-2xl bg-transparent text-gray-700 border-b border-gray-600 my-2 shadow-lg w-full text-center">
            {data[0].supply}
          </p>
          <img src={data[0].signature} className=" w-full" alt="" />
          <button
            className="rounded-2xl bg-red-700 text-white p-2 text-center mt-8 shadow-lg  w-1/2 cursor-pointer  "
            onClick={() => close(null)}
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowFinalStep;
