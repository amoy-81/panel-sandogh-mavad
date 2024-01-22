import React, { useContext, useEffect, useState } from 'react'
import { TashilatContext } from "../../../contexts/Tashilat.Provider";
import { VS2shareholders } from "../../../helper/validation/VS2shareholders";

export default function S2Shareholders({showAllErr , setSendAccept}) {
    const {stepTwo, setStepTwo} = useContext(TashilatContext)
    const [up , setUp] = useState(0)

    // for Validation
    const [err , setErr] = useState([{name : "پر کنید"}])
    const [showErr , setShowErr] = useState([])
    
    
    // console.log(showErr);
   useEffect(() => {
        const jam = {sum_count : 0 , sum_percent : 0 , sum_cost : 0}
        stepTwo.shareholders.map((item) => {
            jam.sum_cost = jam.sum_cost + parseInt(item.cost)
            jam.sum_count = jam.sum_count + parseInt(item.count)
            jam.sum_percent = jam.sum_percent + parseInt(item.percent)
        })

        setStepTwo(prev => (
            {
                ...prev,
                sum_cost : jam.sum_cost,
                sum_percent : jam.sum_percent,
                sum_count : jam.sum_count,
            }
        ))
        
        console.log("C1");
   } , [up])

   // for Validation
   useEffect(() => {
        if (showAllErr) {
            showErr.map((i , index)=> {
                const arr = showErr
                const newObj = {
                    name:true,
                    n_certificate:true,
                    n_national:true,
                    count:true,
                    percent:true,
                    cost:true,
                    education:true
                }
                arr[index] = newObj
                // console.log(arr);
                setShowErr(arr)
            })
        }
        setErr(VS2shareholders(stepTwo.shareholders))
        setSendAccept(prev => ({...prev , shareholders : VS2shareholders(stepTwo.shareholders)}))
    } , [stepTwo , showAllErr])

    const changeHandler = (e) => {
        setStepTwo(prevState => {
            const updated = prevState.shareholders.map((item, index) => {
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
                shareholders: updated
            };
        });
        setUp(p => p + 1)
        console.log(stepTwo);
    }

    // for Validation
    const focusHandler = (e , index) => {
        // console.log(showErr);
        if (showErr[index]) {
            const arr = showErr
            arr[index] = {...arr[index] , [e.target.name] : true}
            setShowErr(arr)
            
        } else if (showErr[index] === undefined) {
            const arr = showErr
            arr[arr.length] = {[e.target.name] : true}
            setShowErr(arr)
        }
        setErr(VS2shareholders(stepTwo.shareholders))
        setSendAccept(prev => ({...prev , shareholders : VS2shareholders(stepTwo.shareholders)}))
    }

    // جمع کل موند
  return (
    <>
        <div className=" py-6 mt-4">
            <p className="text-lg font-extrabold">ترکیب سهامداران </p>
        </div>

        <div className=" ">
            <table className="w-full rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام سهامدار </th>
                <th className="bg-white p-3  ">نوع شخصيت </th>
                <th className="bg-white p-3  ">شماره شناسنامه/ شماره ثبت </th>
                <th className="bg-white p-3  ">شماره ملي/ شناسه ي ملي </th>
                <th className="bg-white p-3  ">تعداد سهام </th>
                <th className="bg-white p-3  ">درصد سهام </th>
                <th className="bg-white p-3  ">ارزش سهام(ريال) </th>
                <th className="bg-white p-3  ">رشته و مدرک تحصیلی </th>
                </tr>
            </thead>
            <tbody>
                {stepTwo.shareholders.length > 0 &&
                    stepTwo.shareholders.map((item, index) => {
                            return (
                                <tr key={index} className="bg-white  border-b">
                                <td className="p-4 text-xs text-gray-800 font-bold">
                                    {index}
                                </td>
                                <td className="p-4 flex flex-col text-xs text-gray-600 font-bold">
                                    <input
                                        type="text"
                                        className={err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].name}
                                        name="name"
                                        id={index}   
                                    />
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <select
                                        onChange={changeHandler}
                                        name="type"
                                        id={index}
                                        className="border-gray-300 rounded-xl w-24 text-xs"
                                    >
                                    <option value="genuine">حقیقی</option>
                                    <option value="legal">حقوقی</option>
                                    </select>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        className={err[index] && err[index].n_certificate && showErr[index] && showErr[index].n_certificate ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].n_certificate}
                                        name="n_certificate"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        className={err[index] && err[index].n_national && showErr[index] && showErr[index].n_national ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].n_national}
                                        name="n_national"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={err[index] && err[index].count && showErr[index] && showErr[index].count ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].count}
                                        name="count"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={err[index] && err[index].percent && showErr[index] && showErr[index].percent ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].percent}
                                        name="percent"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={err[index] && err[index].cost && showErr[index] && showErr[index].cost ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].cost}
                                        name="cost"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                <td className="p-4 text-xs text-gray-600 font-bold">
                                    <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className={err[index] && err[index].education && showErr[index] && showErr[index].education ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                                        onChange={changeHandler}
                                        onFocus={(e) => focusHandler(e , index)}
                                        value={stepTwo.shareholders[index].education}
                                        name="education"
                                        id={index}
                                    />
                                    </div>
                                </td>
                                </tr>
                            )
                    })
                }
                
            
                
                <tr className="bg-white  border-b">
                <td className="p-4 text-xs text-gray-800 font-bold" colSpan="5">
                    جمع کل :
                </td>
                <td className="p-4 text-sm text-gray-800 font-bold">{stepTwo.sum_count}</td>
                <td className="p-4 text-sm text-gray-800 font-bold">{stepTwo.sum_percent}%</td>
                <td className="p-4 text-sm text-gray-800 font-bold">{stepTwo.sum_cost}</td>
                <td className="p-4 text-sm text-gray-800 font-bold"></td>
                </tr>
                <tr className="">
                <td className="bg-white" colSpan="9">
                    <button
                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                    onClick={() => {
                        setStepTwo(prev => (
                            {
                                ...prev ,
                                shareholders : [
                                    ...prev.shareholders,
                                    {
                                        name:"",
                                        type:"genuine",
                                        n_certificate:"",
                                        n_national:"",
                                        count:0,
                                        percent:0,
                                        cost:0,
                                        education:""
                                    },
                                ]
                            }
                        ));
                    }
                }
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