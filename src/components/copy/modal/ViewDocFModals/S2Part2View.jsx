import React from 'react'

export default function S2Part2View({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                    <th className="bg-white p-3  "></th>
                    <th className="bg-white p-3  ">تعداد سهام </th>
                    <th className="bg-white p-3  ">درصد سهام </th>
                    <th className="bg-white p-3  ">ارزش سهام(ريال) </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white  border-b">
                                    <td className="p-4 text-xs text-gray-800 font-bold" colSpan="5">
                                        جمع کل :
                                    </td>
                                        <td className="p-4 text-sm text-gray-800 font-bold">{item.sum_count}</td>
                                        <td className="p-4 text-sm text-gray-800 font-bold">{item.sum_percent}%</td>
                                        <td className="p-4 text-sm text-gray-800 font-bold">{item.sum_cost}</td>
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
