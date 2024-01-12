import React, { Fragment } from 'react'

export default function S5approvalsV({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 text-center ">رديف </th>
              <th className="bg-white p-3 text-center ">شرح مجوز، تائیدیه و...</th>
              <th className="bg-white p-3 text-center ">مرجع صادرکننده</th>
              <th className="bg-white p-3 text-center ">تاریخ صدور</th>
              <th className="bg-white p-3 text-center ">مدت اعتبار</th>
              <th className="bg-white p-3 text-center ">توضیحات</th>
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
                      <span className='max-w-[135px]'>{item.license}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.reference}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.date}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.validity}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.description}</span>
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
