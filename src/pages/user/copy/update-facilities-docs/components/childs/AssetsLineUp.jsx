import React , { useEffect } from 'react'

export default function AssetsLineUp({stepFour, setStepFour , title , mapIndex}) {
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
                className="w-full h-12 border border-gray-300 rounded-xl my -2"
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].last_balance_a}
                name="last_balance_a"
                id={mapIndex}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className="w-full h-12 border border-gray-300 rounded-xl my -2"
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].last_year_a}
                name="last_year_a"
                id={mapIndex}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className="w-full h-12 border border-gray-300 rounded-xl my -2"
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].two_years_a}
                name="two_years_a"
                id={mapIndex}
                required 
            />
        </td>
        <td className="p-2">
            <input
                type='number'
                className="w-full h-12 border border-gray-300 rounded-xl my -2"
                onChange={changeHandler}
                value={stepFour.assets[mapIndex].three_years_a}
                name="three_years_a"
                id={mapIndex}
                required 
            />
        </td>
    </tr>
  )
}
