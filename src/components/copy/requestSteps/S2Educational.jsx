import React, { useContext, useEffect, useState } from 'react'
import { TashilatContext } from "../../../contexts/Tashilat.Provider";
import { VS2shareholders } from "../../../helper/validation/VS2shareholders";

export default function S2Educational({showAllErr , setSendAccept}) {
    const {stepTwo, setStepTwo} = useContext(TashilatContext)

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
                university:true,
                study:true,
                position:true,
                records:true
              }
              arr[index] = newObj
              // console.log(arr);
              setShowErr(arr)
          })
      }
      // console.log("hhhhhhhh");
      console.log(showErr);

      setErr(VS2shareholders(stepTwo.educational))
      setSendAccept(prev => ({...prev , educational : VS2shareholders(stepTwo.educational)}))
    } , [showAllErr , stepTwo])

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
      setErr(VS2shareholders(stepTwo.educational))
      setSendAccept(prev => ({...prev , educational : VS2shareholders(stepTwo.educational)}))
    }

    const changeHandler = (e) => {
        setStepTwo(prevState => {
            const updated = prevState.educational.map((item, index) => {
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
              educational: updated
            };
          });
          console.log(stepTwo.educational[e.target.id]);
    }
  return (
    <>
        <div className=" py-6 mt-4">
            <p className="text-lg font-extrabold">
            سوابق تحصیلی، علمی، تخصصی و اجرایی مدیرعامل و اعضاء هیئت مدیره{" "}
            </p>
        </div>

        <div className=" ">
            <table className="w-full rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام و نام خانوادگی </th>
                <th className="bg-white p-3  ">دانشگاه </th>
                <th className="bg-white p-3  ">رشته و مدرک تحصیلی </th>
                <th className="bg-white p-3  ">سمت در شرکت </th>
                </tr>
            </thead>
            <tbody>
                {stepTwo.educational.length > 0 &&
                stepTwo.educational.map((item, index) => (
                    <>
                    <tr className="bg-white  border-b">
                        <td className="p-4 text-xs text-gray-800 font-bold">
                        {index}
                        </td>

                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={ err[index] && err[index].name && showErr[index] && showErr[index].name?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.educational[index].name}
                            name="name"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].university && showErr[index] && showErr[index].university?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.educational[index].university}
                            name="university"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={ err[index] && err[index].study && showErr[index] && showErr[index].study?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.educational[index].study}
                            name="study"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].position && showErr[index] && showErr[index].position?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.educational[index].position}
                            name="position"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                    </tr>

                    <tr className="bg-white  border-b">
                        <td>سوابق:</td>
                        <td colSpan="5" className="p-2">
                        <textarea
                            className={err[index] && err[index].records && showErr[index] && showErr[index].records ?"w-full h-16 border border-red-300 rounded-xl my-2" :"w-full h-16 border border-gray-300 rounded-xl my-2"}
                            onChange={changeHandler}
                            value={stepTwo.educational[index].records}
                            name="records"
                            id={index}
                            cols="30"
                            rows="10"
                            onFocus={(e) => focusHandler(e , index)}
                        ></textarea>
                        </td>
                    </tr>
                    </>
                ))}

                <tr className="">
                <td className="bg-white" colSpan="9">
                    <button
                    className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                    onClick={() => {
                        setStepTwo(prev => (
                            {
                                ...prev ,
                                educational : [
                                    ...prev.educational,
                                    {
                                        name:"",
                                        university:"",
                                        study:"",
                                        position:"",
                                        records:""
                                    }
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
