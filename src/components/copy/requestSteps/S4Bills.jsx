import React, { useContext, useState } from 'react'
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import BellsLine from './Comp/BellsLine'
export default function S4Bills({showAllErr}) {

    const { stepFour, setStepFour } = useContext(TashilatContext)
    const [showErr , setShowErr] = useState([])
    return (
        <>
            <div className=" py-6 mt-4">
                <p className="text-lg font-extrabold">
                    صورت حساب سود و زیان (ارقام به میلیون ریال){" "}
                </p>
            </div>

            <div className=" ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
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
                            <th className="bg-white p-3  "> سال 1399 </th>

                        </tr>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                            <th className="bg-white p-3  ">مقدار قید شود </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepFour.benefits &&
                            stepFour.benefits.map((item, index) => {
                                return (
                                    <BellsLine showAllErr={showAllErr} showErrObj={{showErr , setShowErr}} title={item.account} mapIndex={index} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}
