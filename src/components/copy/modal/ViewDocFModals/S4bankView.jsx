import React from 'react'

export default function S4bankView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl p-3 overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">رديف </th>
                            <th className="bg-white p-3  ">بانک/ نهاد مالی </th>
                            <th className="bg-white p-3  ">شعبه </th>
                            <th className="bg-white p-3  ">شماره حساب </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white  border-b">
                                    <td className="p-4 text-xs text-gray-800 font-bold">
                                        {index+1}
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                      <span className='max-w-[135px]'>{item.name}</span>
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                      <span className='max-w-[135px]'>{item.branch}</span>
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                      <span className='max-w-[135px]'>{item.account_number}</span>
                                    </td>
                                </tr>
                                )
                            })}
                    </tbody>
                </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
