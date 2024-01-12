import React, { useContext, useEffect, useState } from 'react'
import { TashilatContext } from "../../../contexts/Tashilat.Provider";
import { VS2shareholders } from "../../../helper/validation/VS2shareholders";
import { DatePicker } from 'zaman';
export default function S2Boards({showAllErr , setSendAccept}) {
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
                position:true, 
                n_national:true, 
                birth_date:true, 
                education:true, 
                study:true 
              }
              arr[index] = newObj
              // console.log(arr);
              setShowErr(arr)
          })
      }
      // console.log("hhhhhhhh");
      console.log(showErr);

      setErr(VS2shareholders(stepTwo.boards))
      setSendAccept(prev => ({...prev , boards : VS2shareholders(stepTwo.boards)}))
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
      setErr(VS2shareholders(stepTwo.boards))
      setSendAccept(prev => ({...prev , boards : VS2shareholders(stepTwo.boards)}))
    }

    const changeHandler = (e) => {
        setStepTwo(prevState => {
            const updated = prevState.boards.map((item, index) => {
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
              boards: updated
            };
          });
          console.log(stepTwo.boards[e.target.id]);
    }
    const datechangeHandler = (e, InIndex , keyName) => {
      const day = e.value.getDate()
      const mouth = e.value.getMonth()
      const year = e.value.getFullYear()
      setStepTwo(prevState => {
        const updated = prevState.boards.map((item, index) => {
          if (index === parseInt(InIndex)) {
            if (keyName === "start") {
              return {
                ...item,
                start: `${year}-${mouth + 1}-${day}`
              };
            } else if (keyName === "birth_date") {
              return {
                ...item,
                birth_date: `${year}-${mouth + 1}-${day}`
              };
            }
          }
          return item;
        });
        return {
          ...prevState,
          boards: updated
        };
      });
      console.log(stepTwo);
    }
  return (
    <>
        <div className=" py-6 mt-4">
            <p className="text-lg font-extrabold">
                ترکیب اعضای هیئت مدیره
            </p>
        </div>

        <div className=" ">
            <table className="w-full rounded-xl overflow-hidden">
            <thead>
                <tr className=" sticky top-0 text-sm border-b ">
                <th className="bg-white p-3  ">رديف </th>
                <th className="bg-white p-3  ">نام و نام خانوادگی </th>
                <th className="bg-white p-3  ">نوع شخصیت </th>
                <th className="bg-white p-3  ">سمت </th>
                <th className="bg-white p-3  ">شماره ملی </th>
                <th className="bg-white p-3  ">تاریخ تولد </th>
                <th className="bg-white p-3  ">سطح تحصیلات </th>
                <th className="bg-white p-3  ">رشته تحصیلی </th>
                </tr>
            </thead>
            <tbody>
                {stepTwo.boards.length > 0 &&
                stepTwo.boards.map((item, index) => (
                    <>
                    <tr className="bg-white  border-b">
                        <td className="p-4 text-xs text-gray-800 font-bold">
                        {index}
                        </td>

                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].name && showErr[index] && showErr[index].name ?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].name}
                            name="name"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                            <select
                                onChange={changeHandler}
                                name="type"
                                id={index}
                                className="border-gray-300 rounded-xl w-28 text-xs"
                            >
                            <option value="genuine">حقیقی</option>
                            <option value="legal">حقوقی</option>
                            </select>
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].position && showErr[index] && showErr[index].position ?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].position}
                            name="position"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="number"
                            className={err[index] && err[index].n_national && showErr[index] && showErr[index].n_national ?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-20"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].n_national}
                            name="n_national"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>




                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <DatePicker
                          inputClass={err[index] && err[index].birth_date && showErr[index] && showErr[index].birth_date ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                          onChange={(e) => datechangeHandler(e, index , "birth_date")}
                          locale="fa"
                          placeholder="تاریخ را انتخاب کنید"
                          format="jYYYY/jMM/jDD"
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].education && showErr[index] && showErr[index].education ?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].education}
                            name="education"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
                        </td>
                        <td className="p-4 text-xs text-gray-600 font-bold">
                        <input
                            type="text"
                            className={err[index] && err[index].study && showErr[index] && showErr[index].study ?"border border-red-300 rounded-xl w-full" : "border border-gray-300 rounded-xl w-full"}
                            onChange={changeHandler}
                            value={stepTwo.boards[index].study}
                            name="study"
                            id={index}
                            onFocus={(e) => focusHandler(e , index)}
                        />
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
                                boards : [
                                    ...prev.boards,
                                    { 
                                        name:"", 
                                        type:"", 
                                        position:"", 
                                        n_national:"", 
                                        birth_date:"", 
                                        education:"", 
                                        study:"" 
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
