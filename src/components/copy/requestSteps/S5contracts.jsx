import React, { useContext, useEffect, useState } from 'react'
import { DatePicker } from 'zaman';
import { TashilatContext } from '../../../contexts/Tashilat.Provider';
import { VS2shareholders } from '../../../helper/validation/VS2shareholders';
export default function S5contracts({showAllErr , setSendAccept}) {

    const { stepFive, setStepFive } = useContext(TashilatContext)

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
                subject:true,
                name:true,
                amount:true,
                start:true,
                end:true,
                progress:true
              }
              arr[index] = newObj
              // console.log(arr);
              setShowErr(arr)
          })
      }
      // console.log("hhhhhhhh");
      console.log(showErr);

      setErr(VS2shareholders(stepFive.contracts))
      setSendAccept(prev => ({...prev , contracts : VS2shareholders(stepFive.contracts)}))
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
      setErr(VS2shareholders(stepFive.contracts))
      setSendAccept(prev => ({...prev , contracts : VS2shareholders(stepFive.contracts)}))
    }

    const changeHandler = (e) => {
      setStepFive(prevState => {
        const updated = prevState.contracts.map((item, index) => {
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
          contracts: updated
        };
      });
      console.log(stepFive);
    }
    const datechangeHandler = (e, InIndex , keyName) => {
      const day = e.value.getDate()
      const mouth = e.value.getMonth()
      const year = e.value.getFullYear()
      setStepFive(prevState => {
        const updated = prevState.contracts.map((item, index) => {
          if (index === parseInt(InIndex)) {
            if (keyName === "start") {
              return {
                ...item,
                start: `${year}-${mouth + 1}-${day}`
              };
            } else if (keyName === "end") {
              return {
                ...item,
                end: `${year}-${mouth + 1}-${day}`
              };
            }
          }
          return item;
        });
        return {
          ...prevState,
          contracts: updated
        };
      });
      console.log(stepFive);
    }

  return (
    <>
           {/* contracts */}
      <div className=" py-6 mt-4">
        <p className="text-lg font-extrabold">
          فهرست قراردادهای شاخص شرکت (3 سال گذشته)            </p>
      </div>
      <div className=" ">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className=" sticky top-0 text-sm border-b ">
              <th className="bg-white p-3 text-center ">رديف </th>
              <th className="bg-white p-3 text-center ">موضوع قرارداد</th>
              <th className="bg-white p-3 text-center ">نام کارفرما</th>
              <th className="bg-white p-3 text-center ">مبلغ(میلیون ریال)</th>
              <th className="bg-white p-3 text-center ">تاریخ شروع</th>
              <th className="bg-white p-3 text-center ">تاریخ پایان</th>
              <th className="bg-white p-3 text-center ">درصد پیشرفت</th>
            </tr>
          </thead>
          <tbody>
            {stepFive.contracts.length > 0 &&
              stepFive.contracts.map((item, index) => (
                <>
                  <tr className="bg-white  border-b">
                    <td className="p-4 text-xs text-gray-800 font-bold">
                      {index}
                    </td>

                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].subject && showErr[index] && showErr[index].subject ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepFive.contracts[index].subject}
                        name="subject"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].name && showErr[index] && showErr[index].name ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepFive.contracts[index].name}
                        name="name"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].amount && showErr[index] && showErr[index].amount ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepFive.contracts[index].amount}
                        name="amount"
                        id={index}
                        onFocus={(e) => focusHandler(e , index)}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <DatePicker
                        inputClass={err[index] && err[index].start && showErr[index] && showErr[index].start ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={(e) => datechangeHandler(e, index ,"start")}
                        locale="fa"
                        placeholder="تاریخ را انتخاب کنید"
                        format="jYYYY/jMM/jDD"
                      />

                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <DatePicker
                        inputClass={err[index] && err[index].end && showErr[index] && showErr[index].end ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={(e) => datechangeHandler(e, index , "end")}
                        locale="fa"
                        placeholder="تاریخ را انتخاب کنید"
                        format="jYYYY/jMM/jDD"
                      />

                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className={err[index] && err[index].progress && showErr[index] && showErr[index].progress ? "border border-red-300 rounded-xl w-full" :"border border-gray-300 rounded-xl w-full"}
                        onChange={changeHandler}
                        value={stepFive.contracts[index].progress}
                        name="progress"
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
                        contracts: [
                          ...prev.contracts,
                          {
                            subject:"",
                            name:"",
                            amount:"",
                            start:"",
                            end:"",
                            progress:""
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
