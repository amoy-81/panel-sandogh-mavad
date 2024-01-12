import React, { useEffect, useState } from 'react'
import { TashilatContext } from '../../../../contexts/Tashilat.Provider';
import { useContext } from 'react';
import { V4AssetsVal } from '../../../../helper/validation/VS2shareholders';

export default function AssetsLine({title , mapIndex ,  showAllErr , showErrObj}) {

    const {stepFour, setStepFour} = useContext(TashilatContext)
    const [err , setErr] = useState({})
    const {showErr , setShowErr} = showErrObj

    console.log(showAllErr);

    useEffect(() => {
      if (showAllErr) {
        const arr = []
        stepFour.assets.map((item) => {
          arr.push({three_years_a : true , two_years_a : true , last_year_a : true , last_balance_a : true})
        })
        setShowErr(arr)
      }

      setErr(V4AssetsVal(stepFour.assets))
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
      setErr(V4AssetsVal(stepFour.assets))
    }

    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updated = prevState.assets.map((item, index) => {
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
              assets: updated
            };
          });
          console.log(stepFour.assets[e.target.id]);
    }
  return (
    <tr className="bg-white  border-b">
        <td className="p-2 text-xs text-gray-800 font-bold" colSpan={2}>
            {
                title === "CashBalanceBank" ? "موجودي نقد و بانك" : 
                title === "ShortTermInvestments" ? "سرمايه گذاري هاي كوتاه مدت" : 
                title === "DocumentsAndAccountsReceivable" ? "اسناد و حسابهاي دريافتني" : 
                title === "OtherDocumentsAndAccountsReceivable" ? "ساير اسناد و حسابهاي دريافتني" :
                title === "Inventory" ? "موجودي كالا" :
                title === "prePaids" ? "پيش پرداخت ها" :
                title === "OtherCurrentAssets" ? "ساير دارايي هاي جاري + جاري شركا" :
                title === "TotalCurrentAssets" ? "جمع دارايي هاي جاري" :
                title === "TangibleFixedAssets" ? "دارايي هاي ثابت مشهود" :
                title === "IntangibleFixedAssets" ? "دارايي هاي ثابت  نامشهود" :
                title === "LongtermInvestmentsAndPartnerships" ? "سرمايه گذاري ها و مشاركت هاي بلندمدت" :
                title === "OtherNoncurrentAssets" ? "ساير دارايي هاي غير جاري" :
                title === "TotalFixedAssets" ? "جمع دارايي هاي ثابت" :
                title === "TotalAssets" ? "جمع كل دارايي ها" :
                title === "DocumentsAndAccountsPayable" ? "اسناد و حسابهاي پرداختني" :
                title === "OtherDocumentsAndAccountsPayable" ? "ساير اسناد و حسابهاي پرداختني" :
                title === "ShorttermFacility" ? "تسهيلات كوتاه مدت" :
                title === "prepayments" ? "پيش دريافت ها" :
                title === "OtherCurrentLiabilities" ? "ساير بدهي هاي جاري" :
                title === "TotalCurrentLiabilities" ? "جمع بدهي هاي جاري" :
                title === "LongtermDebt" ? "بدهي هاي بلندمدت" :
                title === "currentPartners" ? "جاري شركا" :
                title === "TotalDebts" ? "جمع كل بدهي ها" :
                title === "ReservesAndReserves" ? "اندوخته و ذخاير" :
                title === "Fund" ? "سرمايه" :
                title === "RetainedEarnings" ? "سود و زيان انباشته" :
                title === "Equities" ? "جمع حقوق صاحبان سهام" :
                title === "totalSumOfLiabilitiesAndEquity" ? "جمع كل بدهي ها و حقوق صاحبان سهام" : ""
            }
        </td>
        <td className="p-2">
            <input
                type='number'
                className={err[mapIndex] && showErr[mapIndex] &&  err[mapIndex].last_balance_a && showErr[mapIndex].last_balance_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].last_balance_a}
                name="last_balance_a"
                id={mapIndex}
                onFocus={(e) => focusHandler(e, mapIndex)}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className={err[mapIndex] && showErr[mapIndex] &&  err[mapIndex].last_year_a && showErr[mapIndex].last_year_a ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].last_year_a}
                name="last_year_a"
                id={mapIndex}
                onFocus={(e) => focusHandler(e, mapIndex)}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className={err[mapIndex] && showErr[mapIndex] &&  err[mapIndex].two_years_a && showErr[mapIndex].two_years_a  ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].two_years_a}
                name="two_years_a"
                id={mapIndex}
                onFocus={(e) => focusHandler(e, mapIndex)}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className={err[mapIndex] && showErr[mapIndex] &&  err[mapIndex].three_years_a && showErr[mapIndex].three_years_a  ? "w-full h-12 border border-red-300 rounded-xl my -2" : "w-full h-12 border border-gray-300 rounded-xl my -2"}
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].three_years_a}
                name="three_years_a"
                id={mapIndex}
                onFocus={(e) => focusHandler(e, mapIndex)}
                required 
            />
        </td>
    </tr>
  )
}
