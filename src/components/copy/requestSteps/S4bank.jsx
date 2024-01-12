import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import { VS2shareholders } from '../../../helper/validation/VS2shareholders';

export default function S4bank({showAllErr , setSendAccept}) {
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
                name:true,
                branch:true,
                account_number:true
              }
              arr[index] = newObj
              // console.log(arr);
              setShowErr(arr)
          })
      }
      // console.log("hhhhhhhh");
      console.log(showErr);

      setErr(VS2shareholders(stepFour.banks))
      setSendAccept(prev => ({...prev , banks : VS2shareholders(stepFour.banks)}))
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
      setErr(VS2shareholders(stepFour.banks))
      setSendAccept(prev => ({...prev , banks : VS2shareholders(stepFour.banks)}))
    }

    const changeHandler = (e) => {
        setStepFour(prevState => {
            const updatedPlaces = prevState.banks.map((item, index) => {
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
                banks: updatedPlaces
            };
        });
        console.log(stepFour.banks[e.target.id]);
    }

    return (
        <>
            <div className=" py-6 mt-4">
                <p className="text-lg font-extrabold">
                    بانکها / نهادهای مالی اصلی شرکت / فرد:{" "}
                </p>
            </div>

            <div className=" ">
                <table className="w-full rounded-xl overflow-hidden">
                    <thead>
                        <tr className=" sticky top-0 text-xs border-b ">
                            <th className="bg-white p-3  ">رديف </th>
                            <th className="bg-white p-3  ">بانک/ نهاد مالی </th>
                            <th className="bg-white p-3  ">شعبه </th>
                            <th className="bg-white p-3  ">شماره حساب </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepFour.banks.length > 0 &&
                            stepFour.banks.map((item, index) => {
                                return (
                                    <tr key={index} className="bg-white  border-b">
                                        <td className="p-4 text-xs text-gray-800 font-bold">
                                            {index+1}
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].name && showErr[index] && showErr[index].name?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].name}
                                                name="name"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].branch && showErr[index] && showErr[index].branch?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].branch}
                                                name="branch"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}

                                            />
                                        </td>
                                        <td className="p-2 text-xs text-gray-600 font-bold">
                                            <input
                                                type="text"
                                                className={ err[index] && err[index].account_number && showErr[index] && showErr[index].account_number?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                                                onChange={changeHandler}
                                                value={stepFour.banks[index].account_number}
                                                name="account_number"
                                                id={index}
                                                onFocus={(e) => focusHandler(e , index)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        <tr className="">
                            <td className="bg-white" colSpan="12">
                                <button
                                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                                    onClick={() => {
                                        setStepFour(prev => (
                                            {
                                                ...prev ,
                                                banks : [
                                                    ...prev.banks,
                                                    {
                                                        name:"",
                                                        branch:"",
                                                        account_number:""
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
