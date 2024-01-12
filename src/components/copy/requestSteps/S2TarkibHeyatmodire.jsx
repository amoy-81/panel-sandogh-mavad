import React, { useState } from 'react'

export default function () {
  const [tarkibModir, setTarkibModir] = useState([]);
  return (
    <>
        <div className=" py-6 mt-4">
        <p className="text-lg font-extrabold">ترکیب اعضای هیئت مدیره </p>
      </div>
      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3  ">رديف </th>
              <th className="bg-white p-3  ">نام و نام خانوادگي</th>
              <th className="bg-white p-3  ">نوع شخصيت </th>
              <th className="bg-white p-3  ">سمت</th>
              <th className="bg-white p-3  ">شماره ملي</th>
              <th className="bg-white p-3  ">تاريخ تولد</th>
              <th className="bg-white p-3  ">سطح تحصيالات</th>
              <th className="bg-white p-3  ">رشته تحصيلي</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white  border-b">
              <td className="p-4 text-xs text-gray-800 font-bold">1</td>

              <td className="p-4 text-xs text-gray-600 font-bold">
                <input
                  type="text"
                  className="border border-gray-300 rounded-xl w-20"
                />
              </td>
              <td className="p-4 text-xs text-gray-600 font-bold">
                <select
                  name=""
                  id=""
                  className="border-gray-300 rounded-xl w-24 text-xs"
                >
                  <option value="مالک">حقیقی</option>
                  <option value="حقوقی">حقوقی</option>
                </select>
              </td>
              <td className="p-4 text-xs text-gray-600 font-bold">
                <div className="flex">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-xl w-20"
                  />
                </div>
              </td>
              <td className="p-4 text-xs text-gray-600 font-bold">
                <div className="flex">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-xl w-20"
                  />
                </div>
              </td>
              <td className="p-4 text-xs text-gray-600 font-bold">
                <div className="flex">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-xl w-20"
                  />
                </div>
              </td>
              <td className="p-4 text-xs text-gray-600 font-bold">
                <div className="flex">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-xl w-20"
                  />
                </div>
              </td>

              <td className="p-4 text-xs text-gray-600 font-bold">
                <div className="flex">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-xl w-20"
                  />
                </div>
              </td>
            </tr>
            {tarkibModir.length > 0 &&
              tarkibModir.map((item, index) => (
                <tr className="bg-white  border-b">
                  <td className="p-4 text-xs text-gray-800 font-bold">
                    {index + 2}
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-xl w-20"
                    />
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <select
                      name=""
                      id=""
                      className="border-gray-300 rounded-xl w-24 text-xs"
                    >
                      <option value="مالک">حقیقی</option>
                      <option value="حقوقی">حقوقی</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-20"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-20"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-20"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-20"
                      />
                    </div>
                  </td>

                  <td className="p-4 text-xs text-gray-600 font-bold">
                    <div className="flex">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-20"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            <tr className="">
              <td className="bg-white" colSpan="8">
                <button
                  className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                  onClick={() => {
                    setTarkibModir([...tarkibModir, "example"]);
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
  )
}
