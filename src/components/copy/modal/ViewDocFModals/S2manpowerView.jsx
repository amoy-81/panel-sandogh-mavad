import React from 'react'

export default function S2manpowerView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام و نام خانوادگي</th>
                <th className="bg-white p-3  ">سمت</th>
                <th className="bg-white p-3  ">سطح تحصيالات</th>
                <th className="bg-white p-3  ">رشته تحصيلي</th>
                <th className="bg-white p-3  ">نوع قرارداد </th>
                <th className="bg-white p-3  ">سابقه کار مرتبط (سال)</th>
                <th className="bg-white p-3  ">اهم سوابق کاري</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white  border-b">
                    <td className="p-4 text-xs text-gray-800 font-bold">
                        {index}
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.name}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.position}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.level_education}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.study}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.type_contract}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.work_experience}</span>
                    </td>

                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.important}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
