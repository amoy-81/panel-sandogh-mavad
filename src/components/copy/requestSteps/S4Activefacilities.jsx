import React, { useContext, useState } from 'react'
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import { useEffect } from 'react';
import { VS2shareholders } from '../../../helper/validation/VS2shareholders';
import { DatePicker } from 'zaman';

export default function S4Activefacilities({showAllErr , setSendAccept}) {
    const { stepFour, setStepFour } = useContext(TashilatContext)
        // for Validation
        const [err , setErr] = useState([{name : "پر کنید"}])
        const [showErr , setShowErr] = useState([])
        // for Validation
        console.log(err);
        useEffect(() => {
          if (showAllErr) {
              showErr.map((i , index)=> {
                  const arr = showErr
                  const newObj = {
                    year:true,
                    name:true,
                    amount_f:true,
                    type_f:true,
                    rate:true,
                    type_collateral:true,
                    n_refunds:true,
                    n_remaining:true,
                    amount_installment:true,
                    remaining_f:true,
                    settlement_time:true
                  }
                  arr[index] = newObj
                  // console.log(arr);
                  setShowErr(arr)
              })
          }
          // console.log("hhhhhhhh");
          console.log(showErr);
    
          setErr(VS2shareholders(stepFour.active_facilities))
          setSendAccept(prev => ({...prev , active_facilities : VS2shareholders(stepFour.active_facilities)}))
        } , [showAllErr , stepFour])
    
        // for Validation
        const focusHandler = (e , index) => {
          if (showErr[index]) {
              const arr = showErr
              arr[index] = {...arr[index] , [e.target.name] : true}
              setShowErr(arr)
              
          } else if (showErr[index] === undefined) {
              const arr = showErr
              arr[arr.length] = {[e.target.name] : true}
              setShowErr(arr)
          }
          setErr(VS2shareholders(stepFour.active_facilities))
          setSendAccept(prev => ({...prev , active_facilities : VS2shareholders(stepFour.active_facilities)}))
        }
    
    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updatedPlaces = prevState.active_facilities.map((item, index) => {
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
                active_facilities: updatedPlaces
            };
        });
        console.log(stepFour.active_facilities[e.target.id]);
    }

    const datechangeHandler = (e, InIndex , keyName) => {
        const day = e.value.getDate()
        const mouth = e.value.getMonth()
        const year = e.value.getFullYear()
        setStepFour(prevState => {
            const updated = prevState.active_facilities.map((item, index) => {
                if (index === parseInt(InIndex)) {
                    if (keyName === "settlement_time") {
                        return {
                            ...item,
                            settlement_time: `${year}-${mouth + 1}-${day}`
                        };
                }
            }
                return item;
            });
            return {
                ...prevState,
                active_facilities: updated
            };
        });
    }
    return (
        <>
            <div className=" py-6 mt-4">
                <p className="text-lg font-extrabold">
                    فهرست تسهیلات فعال شرکت - فهرست تسهیلات تسویه شده (3 سال اخیر){" "}
                </p>
            </div>
            <div className=" mt-2">
                <table className="w-full rounded-xl overflow-hidden">
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
                            <th className="bg-white p-3  ">زمان تسویه حساب نهایی </th>
                            <th className="bg-white p-3  ">تعداد اقساط بازپرداخت شده </th>
                            <th className="bg-white p-3  ">تعداد اقساط باقیمانده </th>
                            <th className="bg-white p-3  ">مبلغ هر قسط </th>
                            <th className="bg-white p-3  ">مانده تسهیلات </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepFour.active_facilities.length > 0 &&
                            stepFour.active_facilities.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white  border-b">
                                        <td className="p-4 text-xs text-gray-800 font-bold">
                                            {index + 1}
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].year && showErr[index] && showErr[index].year ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].year}
                                                name="year"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].name}
                                                name="name"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].amount_f && showErr[index] && showErr[index].amount_f ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].amount_f}
                                                name="amount_f"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>

                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].type_f && showErr[index] && showErr[index].type_f ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].type_f}
                                                name="type_f"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>

                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].rate && showErr[index] && showErr[index].rate ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].rate}
                                                name="rate"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].type_collateral && showErr[index] && showErr[index].type_collateral ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].type_collateral}
                                                name="type_collateral"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        {/* .................................................... */}
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <DatePicker
                                                inputClass={err[index] && err[index].settlement_time && showErr[index] && showErr[index].settlement_time ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                                                onChange={(e) => datechangeHandler(e, index , "settlement_time")}
                                                locale="fa"
                                                placeholder="تاریخ را انتخاب کنید"
                                                format="jYYYY/jMM/jDD"
                                            />
                                        </td>
                                        {/* ............................................................. */}
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].n_refunds && showErr[index] && showErr[index].n_refunds ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].n_refunds}
                                                name="n_refunds"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].n_remaining && showErr[index] && showErr[index].n_remaining ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].n_remaining}
                                                name="n_remaining"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].amount_installment && showErr[index] && showErr[index].amount_installment ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].amount_installment}
                                                name="amount_installment"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="number"
                                                className={ err[index] && err[index].remaining_f && showErr[index] && showErr[index].remaining_f ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_facilities[index].remaining_f}
                                                name="remaining_f"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="">
                            <td className="bg-white" colSpan="12">
                                <button
                                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                                    onClick={() => {
                                        setStepFour(prev => (
                                            {
                                                ...prev ,
                                                active_facilities : [
                                                    ...prev.active_facilities,
                                                    {
                                                        year:"",
                                                        name:"",
                                                        amount_f:"",
                                                        type_f:"",
                                                        rate:"",
                                                        type_collateral:"",
                                                        n_refunds:"",
                                                        n_remaining:"",
                                                        amount_installment:"",
                                                        remaining_f:"",
                                                        settlement_time:"" //2022-03-03
                                                    },
                                                ]
                                            }
                                        ));
                                    }}
                                >
                                    {" "}
                                    افزودن ردیف{" "}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}
