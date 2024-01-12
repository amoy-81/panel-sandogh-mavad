import React from 'react'

export default function S2ViewShareholder({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام سهامدار </th>
                <th className="bg-white p-3  ">نوع شخصيت </th>
                <th className="bg-white p-3  ">شماره شناسنامه/ شماره ثبت </th>
                <th className="bg-white p-3  ">شماره ملي/ شناسه ي ملي </th>
                <th className="bg-white p-3  ">تعداد سهام </th>
                <th className="bg-white p-3  ">درصد سهام </th>
                <th className="bg-white p-3  ">ارزش سهام(ريال) </th>
                <th className="bg-white p-3  ">رشته و مدرک تحصیلی </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white  border-b">
                                    <td className="p-4 text-xs text-gray-800 font-bold">
                                        {index}
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.name}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.type}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.n_certificate}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.n_national}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.count}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.percent}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.cost}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                                        <span className='max-w-[135px]'>{item.education}</span>
                                    </td>
                                </tr>
                            )
                    })
                }
                
            
                
                {/* <tr className="bg-white  border-b">
                <td className="p-4 text-xs text-gray-800 font-bold" colSpan="5">
                    جمع کل :
                </td>
                    <td className="p-4 text-sm text-gray-800 font-bold">{data2.sum_count}</td>
                    <td className="p-4 text-sm text-gray-800 font-bold">{data2.sum_percent}%</td>
                    <td className="p-4 text-sm text-gray-800 font-bold">{data2.sum_cost}</td>
                <td className="p-4 text-sm text-gray-800 font-bold"></td>
                </tr> */}
            </tbody>
            </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
