import React from 'react'

export default function BellsLineView({item , title}) {
  return (
    <tr className="bg-white  border-b">
        <td className="p-2 text-xs text-gray-800 font-bold" colSpan={2}>
            {
              title === "NetSales" ? "فروش خالص و درآمد ارائه خدمات و ساير درآمدها" :
              title === "CostOfgoodssold" ? "بهاي تمام شده كالاي فروش رفته و خدمات" :
              title === "GrossProfit" ? "سود ناخالص " :
              title === "SellingAdministrativeAndGeneralExpenses" ? "هزينههاي فروش، اداري و عمومي " :
              title === "OtherOperatingExpenses" ? "ساير هزينههاي عملياتي" :
              title === "OperatingProfit" ? "سود عملياتي" :
              title === "financialCosts" ? "هزينههاي مالي" :
              title === "NonOperatingExpenses" ? "هزينههاي غيرعملياتي " :
              title === "NonOperatingIncome" ? "درآمدهاي غيرعملياتي" :
              title === "ProfitBeforeTax" ? "سود قبل از ماليات" :
              title === "incomeTax" ? "ماليات بر درآمد" :
              title === "NetProfit" ? "سود خالص" :
              title === "OtherAdjustments" ? "ساير تعديلات" : 
              title === "RetainedEarnings" ? "سود و زيان انباشته" : "" 
            }
        </td>
        <td className="p-2 text-center">
            <span className='max-w-[135px]'>{item.last_balance_a}</span>
        </td>
        <td className="p-2 text-center">
            <span className='max-w-[135px]'>{item.last_year_a}</span>
        </td>
        <td className="p-2 text-center">
            <span className='max-w-[135px]'>{item.two_years_a}</span>
        </td>
        <td className="p-2 text-center">
            <span className='max-w-[135px]'>{item.three_years_a}</span>
        </td>
    </tr>
  )
}
