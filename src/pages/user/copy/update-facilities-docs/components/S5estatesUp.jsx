import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S5estatesUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepFive , setStepFive] = useState({
      estates: [
          ...data
        ],
    })

    useEffect(() => {
      setErr(false)
      let count = 0
      Object.keys(stepFive).map((item) => {
        stepFive[item].map(j => {
          Object.keys(j).map((k) => {
            console.log(j[k]);
            if (j[k] === "") {
              count += 1
            }
          })
        })
      })
      if (count > 0) {
        setErr(true)
      }
    } , [stepFive])

    const changeHandler = (e) => {
      setStepFive(prevState => {
          const updated = prevState.estates.map((item, index) => {
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
              estates: updated
          };
      });
      console.log(stepFive);
  }
    // console.log(sendObject);
    
    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/approvals/${id}`, stepFive)
        .then((res) => {
          console.log(res.data)
          setIsLoading(true)
          toast("تغییرات باموفقیت ثبت شد")
          close(null)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
          toast("ثبت تغییرات با خطا مواجه شد")
        })
    }

    if (isLoading) return <Loader />
    return (
      <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className=" py-6 mt-4">
            <p className="text-lg text-white font-extrabold">
                فهرست دارایی‌های شرکت، مدیران، سهامداران، ضامنین (دریافت فهرست دارایی‌های شرکت و مدیران تنها برای افزایش حد اعتباری شرکت می‌باشد).               </p>
        </div>

        <div className=" ">
            <table className="w-full rounded-xl overflow-hidden">
                <thead>
                    <tr className=" sticky top-0 text-sm border-b ">
                        <th className="bg-white p-3 text-center ">رديف </th>
                        <th className="bg-white p-3 text-center ">نوع دارایی (زمین، ساختمان، خودرو و...)</th>
                        <th className="bg-white p-3 text-center ">مالک</th>
                        <th className="bg-white p-3 text-center ">ارزش تقریبی (میلیون ریال)</th>
                        <th className="bg-white p-3 text-center ">توضیحات</th>

                    </tr>
                </thead>
                <tbody>
                    {stepFive.estates.length > 0 &&
                        stepFive.estates.map((item, index) => (
                            <>
                                <tr className="bg-white  border-b">
                                    <td className="p-4 text-xs text-gray-800 font-bold">
                                        {index}
                                    </td>

                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-xl w-full"
                                            onChange={changeHandler}
                                            value={stepFive.estates[index].type}
                                            name="type"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-xl w-full"
                                            onChange={changeHandler}
                                            value={stepFive.estates[index].owner}
                                            name="owner"
                                            id={index}
                                        />
                                    </td>

                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-xl w-full"
                                            onChange={changeHandler}
                                            value={stepFive.estates[index].cost}
                                            name="cost"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-4 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-xl w-full"
                                            onChange={changeHandler}
                                            value={stepFive.estates[index].description}
                                            name="description"
                                            id={index}
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
                                            estates: [
                                                ...prev.estates,
                                                {
                                                    type:"",
                                                    owner:"",
                                                    cost:"",
                                                    description:""
                                                }
                                            ]
                                        }
                                    ));
                                }}
                            >
                                {" "}
                                افزودن ردیف{" "}
                            </button>
                            {err && <span className='text-red-500 text-center'>*همه فیلد ها باید پر شوند</span>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button className='bg-red-500 p-3 mt-2 ml-2 rounded-xl text-white shadow-md transition hover:bg-red-600' onClick={() => close(null)}>بستن</button>
            <button className='bg-green-500 p-3 mt-2 mr-2 rounded-xl text-white shadow-md transition hover:bg-green-600' onClick={sendHandler}>ثبت اطلاعات</button>
        </div>
      </div>
  )
}
