import React from 'react'
import BellsLineView from './LinesComponent/BellsLineView'

export default function S4benefitView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className="h-[500px]  rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  " rowSpan={2}>
                                شرح حساب{" "}
                            </th>

                            <th className="bg-white p-3  " rowSpan={2}>
                                منتهی به تاریخ{" "}
                            </th>
                            <th className="bg-white p-3  ">آخرین تراز آزمایشی سال 1402</th>
                            <th className="bg-white p-3  ">سال 1401 </th>
                            <th className="bg-white p-3  "> سال 1400 </th>
                            <th className="bg-white p-3  "> سال 1399 </th>

                        </tr>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                        </tr>
                    </thead>
                    <tbody className='overflow-scroll'>
                        {data.map((item, index) => {
                                return (
                                    <BellsLineView key={index} item={item} title={item.account} />
                                )
                            })
                        }
                    </tbody>
                </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
