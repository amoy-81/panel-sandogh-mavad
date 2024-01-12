import React, { useEffect, useState } from 'react'
import { TashilatContext } from '../../../../contexts/Tashilat.Provider';
import { useContext } from 'react';
import { VS2shareholders } from '../../../../helper/validation/VS2shareholders';

export default function BellsLine({title , mapIndex , showAllErr , showErrObj}) {
    const {stepFour, setStepFour} = useContext(TashilatContext)
    const [err , setErr] = useState({})
    const {showErr , setShowErr} = showErrObj
    
    useEffect(() => {
      if (showAllErr) {
        const arr = []
        stepFour.benefits.map((item) => {
          arr.push({three_years_a : true , two_years_a : true , last_year_a : true , last_balance_a : true})
        })
        setShowErr(arr)
      }

      setErr(VS2shareholders(stepFour.benefits))
    } , [stepFour , showAllErr])

    const focusHandler = (e, index) => {
        if (showErr[index]) {
            const arr = showErr
            arr[index] = { ...arr[index], [e.target.name]: true }
            setShowErr(arr)

        } else if (showErr[index] === undefined) {
            console.log(showErr);
            const arr = showErr
            const len = arr.length - 1
            for(let i = 0 ; i < mapIndex ; i++) {
              if ( i > len ) {
                console.log("Y");
                arr.push({})
              }
            }
            arr[mapIndex] = { [e.target.name]: true }
            setShowErr(arr)
        }
        setErr(VS2shareholders(stepFour.benefits))
    }

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
              className={err[mapIndex] && showErr[mapIndex] && err[mapIndex].last_balance_a && showErr[mapIndex].last_balance_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
              onChange={changeHandler}
              value={stepFour.benefits[mapIndex].last_balance_a}
              name="last_balance_a"
              onFocus={(e) => focusHandler(e, mapIndex)}
              id={mapIndex}
              required 
              type='number'
            />
        </td>
        <td className="p-2">
            <input
              className={err[mapIndex] && showErr[mapIndex] && err[mapIndex].last_year_a && showErr[mapIndex].last_year_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
              onChange={changeHandler}
              value={stepFour.benefits[mapIndex].last_year_a}
              name="last_year_a"
              id={mapIndex}
              onFocus={(e) => focusHandler(e, mapIndex)}
              required 
              type='number'
            />
        </td>
        <td className="p-2">
            <input
              className={err[mapIndex] && showErr[mapIndex] && err[mapIndex].two_years_a && showErr[mapIndex].two_years_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
              onChange={changeHandler}
              value={stepFour.benefits[mapIndex].two_years_a}
              name="two_years_a"
              id={mapIndex}
              onFocus={(e) => focusHandler(e, mapIndex)}
              required 
              type='number'
            />
        </td>
        <td className="p-2">
            <input
              className={err[mapIndex] && showErr[mapIndex] && err[mapIndex].three_years_a && showErr[mapIndex].three_years_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
              onChange={changeHandler}
              value={stepFour.benefits[mapIndex].three_years_a}
              name="three_years_a"
              id={mapIndex}
              onFocus={(e) => focusHandler(e, mapIndex)}
              required 
              type='number'
            />
        </td>
    </tr>
  )
}
