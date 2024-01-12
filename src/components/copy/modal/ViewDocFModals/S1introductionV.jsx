import React, { Fragment } from "react";

export default function S1introductionV({ data, close }) {
  console.log(data);
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
      <table className=" max-w-7xl rounded-xl overflow-hidden">
        <thead>
          <tr className=" sticky top-0   ">
            <th className="bg-white p-3  ">تاریخچه و معرفی اجمالی شرکت </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white ">
            <td className="p-4 text-xs text-gray-600 font-bold">
              <span className="max-w-[135px]">{data.history}</span>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr className=" sticky top-0   ">
            <th className="bg-white p-3  ">
              شرح مختصر فعالیتها و فرآیند تولید/خدمات اصلی شرکت و همچنین نحوه
              تأمین مواد اولیه/ قطعات مصرفی{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white ">
            <td className="p-4 text-xs text-gray-600 font-bold">
              <span className="max-w-[135px]">{data.activity}</span>
            </td>
          </tr>
        </tbody>
        <thead>
          <tr className=" sticky top-0   ">
            <th className="bg-white p-3  ">وضعیت و حوزه دانش بنیان</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white ">
            <td className=" text-xs text-gray-600 font-bold">
              <div className="flex  items-center m-3">
                <p className="font-bold text-sm">
                  آیا شرکت در فهرست شرکتهای دانش بنیان معاونت علمی ریاست جمهوری
                  قرار دارد؟
                </p>
                <span className="max-w-[135px]">
                  {data.is_knowledge === 1 ? "دارد" : "ندارد"}
                </span>
              </div>
            </td>
          </tr>
          <tr className="bg-white ">
            <td className="p-4 text-xs text-gray-600 font-bold flex">
              <div className="flex  items-center m-3 w-1/2">
                <p className="font-bold text-sm">
                  تاریخ تأییدیه دانش بنیان توسط معاونت علمی ریاست جمهور:{" "}
                </p>
                <span className="max-w-[135px]">{data.confirmation}</span>
              </div>
              <div className="flex  items-center m-3 w-1/2">
                <p className="font-bold text-sm">
                  تاریخ انقضاء تأییدیه دانشبنیان:{" "}
                </p>
                <span className="max-w-[135px]">{data.expiration}</span>
              </div>
            </td>
          </tr>
          <tr className="bg-white ">
            <td
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="p-4 text-xs text-gray-600 font-bold"
            >
              <span className="max-w-[135px]">{data.area}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => close(null)}
        className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500"
      >
        بستن
      </button>
    </div>
  );
}
