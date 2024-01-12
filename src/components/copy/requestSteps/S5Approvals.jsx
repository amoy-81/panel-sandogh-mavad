import React, { useContext, useEffect, useState } from 'react'
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import { VS2shareholders } from '../../../helper/validation/VS2shareholders';
import { DatePicker } from 'zaman';

export default function S5Approvals({showAllErr , setSendAccept}) {
  const { stepFive, setStepFive } = useContext(TashilatContext)

   // for Validation
   const [err , setErr] = useState([{name : "پر کنید"}])
   const [showErr , setShowErr] = useState([])
   console.log(showErr);
   // for Validation
   console.log(err);
   useEffect(() => {
     if (showAllErr) {
         showErr.map((i , index)=> {
             const arr = showErr
             const newObj = {
              license: true,
              reference: true,
              date: true,
              validity: true,
              description: true
             }
             arr[index] = newObj
             // console.log(arr);
             setShowErr(arr)
         })
     }
     // console.log("hhhhhhhh");
     console.log(showErr);

     setErr(VS2shareholders(stepFive.approvals))
     setSendAccept(prev => ({...prev , approvals : VS2shareholders(stepFive.approvals)}))
   } , [showAllErr , stepFive])

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
     setErr(VS2shareholders(stepFive.approvals))
     setSendAccept(prev => ({...prev , approvals : VS2shareholders(stepFive.approvals)}))
   }





  const changeHandler = (e) => {
    setStepFive(prevState => {
      const updated = prevState.approvals.map((item, index) => {
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
        approvals: updated
      };
    });
    console.log(stepFive);
  }
  const datechangeHandler = (e, InIndex) => {
    const day = e.value.getDate()
    const mouth = e.value.getMonth()
    const year = e.value.getFullYear()
    setStepFive(prevState => {
      const updated = prevState.approvals.map((item, index) => {
        if (index === parseInt(InIndex)) {
          return {
            ...item,
            date: `${year}-${mouth + 1}-${day}`
          };
        }
        return item;
      });
      return {
        ...prevState,
        approvals: updated
      };
    });
    console.log(stepFive);
  }
  return (
    <>
      <div className=" py-6 mt-4">
        <p className="text-lg font-extrabold">
          وضعیت مجوزهای تأییدیه‌ها، استانداردها، پروانه تأسیس، پروانه بهره‌برداری و ثبت اختراع و ...
        </p>
      </div>

      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 text-center ">رديف </th>
              <th className="bg-white p-3 text-center ">شرح مجوز، تائیدیه و...</th>
              <th className="bg-white p-3 text-center ">مرجع صادرکننده</th>
              <th className="bg-white p-3 text-center ">تاریخ صدور</th>
              <th className="bg-white p-3 text-center ">مدت اعتبار</th>
              <th className="bg-white p-3 text-center ">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {stepFive.approvals.length > 0 &&
              stepFive.approvals.map((item, index) => (
                <>
                  <tr className="bg-white  border-b">
                    <td className="p-4 text-xs text-gray-800 font-bold">
                      {index}
                    </td>

                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].license && showErr[index] && showErr[index].license ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                        onChange={changeHandler}
                        value={stepFive.approvals[index].license}
                        name="license"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}

                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].reference && showErr[index] && showErr[index].reference ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                        onChange={changeHandler}
                        value={stepFive.approvals[index].reference}
                        name="reference"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}

                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <DatePicker
                        inputClass={err[index] && err[index].date && showErr[index] && showErr[index].date ? "text-center border border-red-300 rounded-xl w-full" :"text-center border border-gray-300 rounded-xl w-full"}
                        onChange={(e) => datechangeHandler(e, index)}
                        locale="fa"
                        placeholder="تاریخ را انتخاب کنید"
                        format="jYYYY/jMM/jDD"
                        onFocus={(e) => focusHandler(e , index)}

                      />

                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].validity && showErr[index] && showErr[index].validity ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                        onChange={changeHandler}
                        value={stepFive.approvals[index].validity}
                        name="validity"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}

                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].description && showErr[index] && showErr[index].description ? "border border-red-300 rounded-xl w-20" : "border border-gray-300 rounded-xl w-20"}
                        onChange={changeHandler}
                        value={stepFive.approvals[index].description}
                        name="description"
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
                  onClick={(e) => {
                    e.preventDefault()
                    setStepFive(prev => (
                      {
                        ...prev,
                        approvals: [
                          ...prev.approvals,
                          {
                            license: "",
                            reference: "",
                            date: "",
                            validity: "",
                            description: ""
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
