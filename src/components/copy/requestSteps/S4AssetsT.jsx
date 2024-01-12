import React from 'react'
import AssetsLine from './Comp/AssetsLine'
import { useContext } from 'react'
import { TashilatContext } from '../../../contexts/Tashilat.Provider'

export default function S4AssetsT({showErrObj , showAllErr}) {
    const {stepFour, setStepFour} = useContext(TashilatContext)
    
  return (
    <div className="mt-4">
        <table className="w-full rounded-xl overflow-hidden">
            <thead>
                <tr className="bg-white  border-b">
                    <th
                        className="p-2 text-lg text-gray-800 font-bold text-center"
                        colSpan={6}
                    >
                        دارایی ها
                    </th>
                </tr>
                <tr className=" sticky top-0 text-xs border-b ">
                    <th className="bg-white p-3  " rowSpan={2}>
                        شرح حساب{" "}
                    </th>

                    <th className="bg-white p-3  " rowSpan={2}>
                        منتهی به تاریخ{" "}
                    </th>
                    <th className="bg-white p-3  ">آخرین تراز آزمایشی سال 1402</th>
                    <th className="bg-white p-3  ">سال 1401 </th>
                    <th className="bg-white p-3  "> سال 1400 </th>
                    <th className="bg-white p-3  "> سال1399    </th>

                </tr>
                <tr className=" sticky top-0 text-xs border-b ">
                    <th className="bg-white p-3  ">مقدار قید شود </th>
                    <th className="bg-white p-3  ">مقدار قید شود </th>
                    <th className="bg-white p-3  ">مقدار قید شود </th>
                    <th className="bg-white p-3  ">مقدار قید شود </th>

                </tr>
            </thead>
            <tbody>
                {stepFour.assets && 
                    stepFour.assets.map((item, index)  =>{
                        if (item.is_asset) {
                            return (
                                <AssetsLine showErrObj={showErrObj} showAllErr={showAllErr} title={item.account} mapIndex={index}   />
                            )
                        }
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
