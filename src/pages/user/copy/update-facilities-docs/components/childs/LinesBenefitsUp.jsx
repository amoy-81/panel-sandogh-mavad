import React from 'react'

export default function LinesBenefitsUp({stepFour, setStepFour , title , mapIndex}) {
    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updated = prevState.benefits.map((item, index) => {
              if (index === parseInt(e.target.id)) {
                return {
                  ...item,
                  [e.target.name]: e.target.value
                };
              }
              return item;
            });
            return {
              ...prevState,
              benefits: updated
            };
        });
        console.log(stepFour.benefits);
    }
    return (
        <tr className="bg-white  border-b">
            <td className="p-2 text-xs text-gray-800 font-bold" colSpan={2}>
                {
                    title === "NetSales" ? "فروش خالص و درآمد ارائه خدمات و ساير درآمدها" :
                    title === "CostOfgoodssold" ? "بهاي تمام شده كالاي فروش رفته و خدمات" :
                    title === "GrossProfit" ? "سود ناخالص " :
                    title === "SellingAdministrativeAndGeneralExpenses" ? "هزينه هاي فروش، اداري و عمومي " :
                    title === "OtherOperatingExpenses" ? "ساير هزينه هاي عملياتي" :
                    title === "OperatingProfit" ? "سود عملياتي" :
                    title === "financialCosts" ? "هزينه هاي مالي" :
                    title === "NonOperatingExpenses" ? "هزينه هاي غيرعملياتي " :
                    title === "NonOperatingIncome" ? "درآمدهاي غيرعملياتي" :
                    title === "ProfitBeforeTax" ? "سود قبل از ماليات" :
                    title === "incomeTax" ? "ماليات بر درآمد" :
                    title === "NetProfit" ? "سود خالص" :
                    title === "OtherAdjustments" ? "ساير تعديلات" : 
                    title === "RetainedEarnings" ? "سود و زيان انباشته" : "" 
                }
            </td>
            <td className="p-2">
                <input
                    type='number'
                    className="w-full h-12 border border-gray-300 rounded-xl my -2"
                    onChange={changeHandler}
                    value={stepFour.benefits[mapIndex].last_balance_a}
                    name="last_balance_a"
                    id={mapIndex}
                    required 
                ></input>
            </td>
            <td className="p-2">
                <input
                    type='number'
                    className="w-full h-12 border border-gray-300 rounded-xl my -2"
                    onChange={changeHandler}
                    value={stepFour.benefits[mapIndex].last_year_a}
                    name="last_year_a"
                    id={mapIndex}
                    required 
                ></input>
            </td>
            <td className="p-2">
                <input
                    className="w-full h-12 border border-gray-300 rounded-xl my -2"
                    type='number'
                    onChange={changeHandler}
                    value={stepFour.benefits[mapIndex].two_years_a}
                    name="two_years_a"
                    id={mapIndex}
                    required 
                ></input>
            </td>
            <td className="p-2">
                <input
                    className="w-full h-12 border border-gray-300 rounded-xl my -2"
                    type='number'
                    onChange={changeHandler}
                    value={stepFour.benefits[mapIndex].three_years_a}
                    name="three_years_a"
                    id={mapIndex}
                    required 
                ></input>
            </td>
        </tr>
    )
}
