import React, { useContext, useState } from 'react'
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import { useEffect } from 'react';
import { VS2shareholders } from '../../../helper/validation/VS2shareholders';
import { DatePicker } from 'zaman';
export default function S4Activewarranty({showAllErr , setSendAccept}) {

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
                name: true,
                amount: true,
                subject: true,
                institution: true,
                type_w: true,
                type_collateral: true,
                deposit_amount: true,
                received: true, //2022-10-10
                due_date: true
              }
              arr[index] = newObj
              // console.log(arr);
              setShowErr(arr)
          })
      }
      // console.log("hhhhhhhh");
      console.log(showErr);

      setErr(VS2shareholders(stepFour.active_warranty))
      setSendAccept(prev => ({...prev , active_warranty : VS2shareholders(stepFour.active_warranty)}))
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
      setErr(VS2shareholders(stepFour.active_warranty))
      setSendAccept(prev => ({...prev , active_warranty : VS2shareholders(stepFour.active_warranty)}))
    }
    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updatedPlaces = prevState.active_warranty.map((item, index) => {
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
                active_warranty: updatedPlaces
            };
        });
        console.log(stepFour.active_warranty[e.target.id]);
    }

    const datechangeHandler = (e, InIndex , keyName) => {
        const day = e.value.getDate()
        const mouth = e.value.getMonth()
        const year = e.value.getFullYear()
        setStepFour(prevState => {
            const updated = prevState.active_warranty.map((item, index) => {
            if (index === parseInt(InIndex)) {
                if (keyName === "received") {
                return {
                    ...item,
                    received: `${year}-${mouth + 1}-${day}`
                };
                } else if (keyName === "due_date") {
                    return {
                        ...item,
                        due_date: `${year}-${mouth + 1}-${day}`
                    };
                }
            }
                return item;
            });
            return {
                ...prevState,
                active_warranty: updated
            };
        });
    }
    return (
        <>
            <div className=" py-6 mt-4">
                <p className="text-lg font-extrabold">
                    فهرست ضمانتنامه فعال شرکت - فهرست ضمانتنامه باطل شده (3 سال اخیر){" "}
                </p>
            </div>
            <div className="mt-2 ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">رديف </th>

                            <th className="bg-white p-3  ">
                                نام بانک و شعبه/ نام صندوق و یا سایر مراکز ارائه دهنده تسهیلات{" "}
                            </th>
                            <th className="bg-white p-3  ">
                                مبلغ ضمانتنامه دریافتی(میلیون ریال){" "}
                            </th>
                            <th className="bg-white p-3  ">موضوع قرارداد </th>
                            <th className="bg-white p-3  ">نهاد دریافت کننده ضمانتنامه </th>
                            <th className="bg-white p-3  ">تاریخ اخذ </th>
                            <th className="bg-white p-3  ">تاریخ سررسید نهایی </th>
                            <th className="bg-white p-3  ">نوع ضمانت نامه </th>
                            <th className="bg-white p-3  ">
                                نوع وثیقه سپرده شده جهت دریافت ضمانت نامه{" "}
                            </th>
                            <th className="bg-white p-3  ">
                                میزان ودیعه سپرده شده جهت دریافت ضمانت نامه{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepFour.active_warranty.length > 0 &&
                            stepFour.active_warranty.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white  border-b">
                                        <td className="p-4 text-xs text-gray-800 font-bold">
                                            {index + 1}
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].name}
                                                name="name"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].amount && showErr[index] && showErr[index].amount ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].amount}
                                                name="amount"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].subject && showErr[index] && showErr[index].subject ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].subject}
                                                name="subject"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>

                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].institution && showErr[index] && showErr[index].institution ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].institution}
                                                name="institution"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>

                                        {/* .................................... */}
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <DatePicker
                                                inputClass={err[index] && err[index].received && showErr[index] && showErr[index].received ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                                                onChange={(e) => datechangeHandler(e, index ,"received")}
                                                locale="fa"
                                                placeholder="تاریخ را انتخاب کنید"
                                                format="jYYYY/jMM/jDD"
                                            />

                                        </td>
                                        <td className="p-4 text-xs text-gray-600 font-bold">
                                            <DatePicker
                                                inputClass={err[index] && err[index].due_date && showErr[index] && showErr[index].due_date ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                                                onChange={(e) => datechangeHandler(e, index , "due_date")}
                                                locale="fa"
                                                placeholder="تاریخ را انتخاب کنید"
                                                format="jYYYY/jMM/jDD"
                                            />
                                        </td>
                                        {/* .............................................. */}
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].type_w && showErr[index] && showErr[index].type_w ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].type_w}
                                                name="type_w"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].type_collateral && showErr[index] && showErr[index].type_collateral ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].type_collateral}
                                                name="type_collateral"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].deposit_amount && showErr[index] && showErr[index].deposit_amount ? "border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.active_warranty[index].deposit_amount}
                                                name="deposit_amount"
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
                                                ...prev,
                                                active_warranty: [
                                                    ...prev.active_warranty,
                                                    {
                                                        name: "",
                                                        amount: "",
                                                        subject: "",
                                                        institution: "",
                                                        type_w: "",
                                                        type_collateral: "",
                                                        deposit_amount: "",
                                                        received: "", //2022-10-10
                                                        due_date: ""  //2022-10-10
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
