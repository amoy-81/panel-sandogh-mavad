import React from 'react'

export default function AssetsLineView({title , item}) {
  // console.log(item);
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
                title === "LongtermInvestmentsAndPartnerships" ? "سرمايهگذاري ها و مشاركت هاي بلندمدت" :
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
                title === "totalSumOfLiabilitiesAndEquity" ? "جمع كل بدهيها و حقوق صاحبان سهام" : ""
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
