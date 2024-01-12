import React from 'react'

export default function S4active_fView({ data , close }) {
  return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center z-10">
        <table className=" max-w-[1200px] rounded-xl overflow-hidden">
          <thead>
              <tr className=" sticky top-0 text-xs border-b ">
                  <th className="bg-white p-3  ">رديف </th>
                  <th className="bg-white p-3  ">سال دریافت </th>
                  <th className="bg-white p-3  ">
                      نام بانک و شعبه/ نام صندوق و یا سایر مراکز ارائه دهنده تسهیلات{" "}
                  </th>
                  <th className="bg-white p-3  ">
                      مبلغ تسهیلات دریافتی (میلیون ریال){" "}
                  </th>
                  <th className="bg-white p-3  ">
                      نوع تسهیلات (جعاله، مضاربه) و...{" "}
                  </th>
                  <th className="bg-white p-3  ">نرخ تسهیلات </th>
                  <th className="bg-white p-3  ">نوع وثیقه </th>
                  <th className="bg-white p-3  ">تعداد اقساط بازپرداخت شده </th>
                  <th className="bg-white p-3  ">تعداد اقساط باقیمانده </th>
                  <th className="bg-white p-3  ">مبلغ هر قسط </th>
                  <th className="bg-white p-3  ">مانده تسهیلات </th>
                  <th className="bg-white p-3  ">زمان تسویه حساب نهایی </th>
              </tr>
          </thead>
          <tbody>
              {data.map((item, index) => {
                      return (
                          <tr key={index} className="bg-white  border-b">
                              <td className="p-4 text-xs text-gray-800 font-bold">
                                  {index + 1}
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.year}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.name}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.amount_f}</span>
                              </td>

                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.type_f}</span>
                              </td>

                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.rate}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.type_collateral}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.n_refunds}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.n_remaining}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.amount_installment}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.remaining_f}</span>
                              </td>
                              <td className="p-2 text-xs text-gray-600 font-bold text-center">
                                <span className='max-w-[135px]'>{item.settlement_time}</span>
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
