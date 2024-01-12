import React, { Fragment } from 'react'

export default function S5contractV({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 text-center ">رديف </th>
              <th className="bg-white p-3 text-center ">موضوع قرارداد</th>
              <th className="bg-white p-3 text-center ">نام کارفرما</th>
              <th className="bg-white p-3 text-center ">مبلغ( میلیون ریال)</th>
              <th className="bg-white p-3 text-center ">تاریخ شروع</th>
              <th className="bg-white p-3 text-center ">تاریخ پایان</th>
              <th className="bg-white p-3 text-center ">درصد پیشرفت</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
                <Fragment key={index}>
                  <tr className="bg-white  border-b">
                    <td className="p-4 text-xs text-gray-800 font-bold">
                      {index}
                    </td>

                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.subject}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.name}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.amount}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.start}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.end}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.progress}</span>
                    </td>
                  </tr>
                </Fragment>
              ))}
          </tbody>
        </table>
        <button onClick={() => close(null)}  className="m-1 rounded-lg bg-white mt-2 p-3 font-bold text-xs hover:text-red-500" >بستن</button>
    </div>
  )
}
