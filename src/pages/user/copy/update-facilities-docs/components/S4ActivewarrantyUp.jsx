import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S4ActivewarrantyUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepFour , setStepFour] = useState({
      active_warranty: [
            ...data
        ],
    })

    
    // console.log(sendObject);
    useEffect(() => {
      setErr(false)
      let count = 0
      Object.keys(stepFour).map((item) => {
        stepFour[item].map(j => {
          Object.keys(j).map((k) => {
            if (j[k] === "") {
              count += 1
            }
          })
        })
      })
      if (count > 0) {
        setErr(true)
      }
    } , [stepFour])

    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/bank/${id}`, stepFour)
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
    if (isLoading) return <Loader />
    return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className=" py-6 mt-4">
            <p className="text-lg text-white font-extrabold">
                فهرست ضمانتنامه فعال شرکت - فهرست ضمانتنامه باطل شده (3 سال اخیر){" "}
            </p>
        </div>
        <span className='p-2 text-sm text-white'>* فیلد های تاریخ اخذ و تاریخ سر رسید نهایی با فرمت : 9-10-1399 پر شود</span>
        <div className="mt-2 ">
            <table className="max-w-[1000px] rounded-xl overflow-hidden">
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
                        <th className="bg-white p-3  ">نوع ضمانت نامه </th>
                        <th className="bg-white p-3  ">
                            نوع وثیقه سپرده شده جهت دریافت ضمانت نامه{" "}
                        </th>
                        <th className="bg-white p-3  ">
                            میزان ودیعه سپرده شده جهت دریافت ضمانت نامه{" "}
                        </th>
                        <th className="bg-white p-3  ">تاریخ اخذ </th>
                        <th className="bg-white p-3  ">تاریخ سررسید نهایی </th>
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
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].name}
                                            name="name"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].amount}
                                            name="amount"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].subject}
                                            name="subject"
                                            id={index}
                                        />
                                    </td>

                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].institution}
                                            name="institution"
                                            id={index}
                                        />
                                    </td>

                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].type_w}
                                            name="type_w"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].type_collateral}
                                            name="type_collateral"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].deposit_amount}
                                            name="deposit_amount"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].received}
                                            name="received"
                                            id={index}
                                        />
                                    </td>
                                    <td className="p-2 text-xs text-gray-600 font-bold">
                                        <input
                                            type="text"
                                            className={"border border-gray-300 rounded-xl w-full"}
                                            onChange={changeHandler}
                                            value={stepFour.active_warranty[index].due_date}
                                            name="due_date"
                                            id={index}
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
                                onClick={(e) => {
                                  e.preventDefault()
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
