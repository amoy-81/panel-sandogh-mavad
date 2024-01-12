import React from 'react'
import AssetsLineView from './LinesComponent/AssetsLineView'

export default function S4AssetView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <div id="t" className='flex h-[85vh] overflow-scroll'>
            <table className="w-[550px] p-5 ml-2 rounded-xl">
                <thead>
                    <tr className="bg-white  border-b">
                        <th
                            className="p-2 text-lg text-gray-800 font-bold text-center"
                            colSpan={6}
                        >
                            دارایی ها
                        </th>
                    </tr>
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
                        <th className="bg-white p-3  "> سال1399    </th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index)  =>{
                            if (item.is_asset) {
                                return (
                                    <AssetsLineView title={item.account} item={item}   />
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            <table className="w-[550px] p-5 mr-2 rounded-xl overflow-hidden">
                <thead>
                    <tr className="bg-white  border-b">
                        <th
                            className="p-2 text-lg text-gray-800 font-bold text-center"
                            colSpan={6}
                        >
                            بدهی ها
                        </th>
                    </tr>
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
                        <th className="bg-white p-3  "> سال1399    </th>

                    </tr>
                    <tr className=" sticky top-0 text-xs border-b ">
                        <th className="bg-white p-3  ">مقدار قید شود </th>
                        <th className="bg-white p-3  ">مقدار قید شود </th>
                        <th className="bg-white p-3  ">مقدار قید شود </th>
                        <th className="bg-white p-3  ">مقدار قید شود </th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index)  =>{
                            if (!item.is_asset) {
                                return (
                                    <AssetsLineView title={item.account} item={item}   />
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500 shadow" >بستن</button>
    </div>
  )
}
