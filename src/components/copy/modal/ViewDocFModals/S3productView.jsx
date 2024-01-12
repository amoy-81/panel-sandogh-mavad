import React from 'react'

export default function S3productView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3  ">رديف </th>
              <th className="bg-white p-3  ">نام محصول/خدمت </th>
              <th className="bg-white p-3  ">مشتریان اصلی </th>
              <th className="bg-white p-3  ">مشخصات و کاربرد محصول/خدمت </th>
              <th className="bg-white p-3  ">رقبای اصلی در رابطه با محصول </th>
              <th className="bg-white p-3  ">
                میزان فروش یک سال گذشت (میلیون ریال){" "}
              </th>
              <th className="bg-white p-3  ">تأییدیه دانش بنیان؟ </th>
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
                      <span className='max-w-[135px]'>{item.customer}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.specifications}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.competitor}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.sales_amount}</span>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold text-center">
                      <span className='max-w-[135px]'>{item.is_confirmation === 1 ? "می باشد" : "نمی باشد"}</span>
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
