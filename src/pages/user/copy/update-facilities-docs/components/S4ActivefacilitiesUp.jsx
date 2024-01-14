import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S4ActivefacilitiesUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepFour , setStepFour] = useState({
      active_facilities: [
            ...data
        ],
    })
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
    // console.log(sendObject);
    
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

    if (isLoading) return <Loader />
    return (
    <div className="bg-gradient-to-b from-gray-600 to-transparent fixed inset-0 flex flex-col items-center justify-center">
        <div className=" py-6 mt-4">
              <p className="text-lg text-white font-extrabold">
                  فهرست تسهیلات فعال شرکت - فهرست تسهیلات تسویه شده (3 سال اخیر){" "}
              </p>
          </div>
          <span className='p-2 text-white text-sm'>* فیلد های زمان تسویه حساب نهایی با فرمت : 9-10-1399 پر شود</span>
          <div className=" mt-2">
              <table className="max-w-[1000px] rounded-xl overflow-hidden">
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
                          <th className="bg-white p-3  ">تعداد اقساط بازپرداخت شده </th>
                          <th className="bg-white p-3  ">تعداد اقساط باقیمانده </th>
                          <th className="bg-white p-3  ">مبلغ هر قسط </th>
                          <th className="bg-white p-3  ">مانده تسهیلات </th>
                          <th className="bg-white p-3  ">زمان تسویه حساب نهایی </th>
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
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].year}
                                              name="year"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="text"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].name}
                                              name="name"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].amount_f}
                                              name="amount_f"
                                              id={index}
                                          />
                                      </td>

                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="text"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].type_f}
                                              name="type_f"
                                              id={index}
                                          />
                                      </td>

                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].rate}
                                              name="rate"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="text"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].type_collateral}
                                              name="type_collateral"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].n_refunds}
                                              name="n_refunds"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].n_remaining}
                                              name="n_remaining"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].amount_installment}
                                              name="amount_installment"
                                              id={index}
                                          />
                                      </td>
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="number"
                                              className={"border border-gray-300 rounded-xl w-full"}
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].remaining_f}
                                              name="remaining_f"
                                              id={index}
                                          />
                                      </td>
                                      {/* .................................................... */}
                                      <td className="p-2 text-xs text-gray-600 font-bold">
                                          <input
                                              type="text"
                                              className="border border-gray-300 rounded-xl w-full"
                                              onChange={changeHandler}
                                              value={stepFour.active_facilities[index].settlement_time}
                                              name="settlement_time"
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
                                              settlement_time:"2022-03-03" //2022-03-03
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
