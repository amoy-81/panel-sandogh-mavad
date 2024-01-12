import React from 'react'

export default function S1Places({ data , close }) {
    console.log(data);
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
        <thead>
            <tr className=" sticky top-0   ">
            <th className="bg-white p-3  ">کاربری </th>
            <th className="bg-white p-3 ">نشانی </th>
            <th className="bg-white p-3 "> متراژ (مترمربع)</th>
            <th className="bg-white p-3 ">مالک/ استیجاری </th>
            <th className="bg-white p-3 ">تعداد کارکنان </th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((item , index) => {
                    return(
                        <tr key={index} className="bg-white border-b">
                            <td className="p-4 text-xs text-gray-800 font-bold">
                                {
                                    item.scope === "workHouse" ? "دفتر مرکزی" :
                                    item.scope === "factory" ? "کارگاه یا کارخانه" :
                                    item.scope === "storeHouse" ? "انبار" : ""
                                }
                            </td>
                            <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.address}</span>
                            </td>
                            <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.address}</span>
                            </td>
                            <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.ownership === "owner" ? "مالک" : "استیجاری"}</span>
                            </td>
                            <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.count}</span>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
