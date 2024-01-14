import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';

export default function S2ShareholdersUp({close , data , id , toast }) {
    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepTwo, setStepTwo] = useState({
      shareholders: [
        ...data
      ],
    })

    useEffect(() => {
      setErr(false)
      let count = 0
      Object.keys(stepTwo).map((item) => {
        stepTwo[item].map(j => {
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
    } , [stepTwo])
    // console.log(sendObject);
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
      console.log(stepTwo);
    }

    const sendHandler = (e) => {
        e.preventDefault()
        setIsLoading(false)
        Axios.put(`/v1/shareholder/${id}`, stepTwo)
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
            <p className="text-lg text-white font-extrabold">ترکیب سهامداران </p>
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
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                              <div className="flex flex-col">
                              <input
                                  type="number"
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
                                  value={stepTwo.shareholders[index].n_certificate}
                                  name="n_certificate"
                                  id={index}
                              />
                              </div>
                          </td>
                          <td className="p-4 text-xs text-gray-600 font-bold">
                              <div className="flex flex-col">
                              <input
                                  type="number"
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                                  className={"border border-gray-300 rounded-xl w-20"}
                                  onChange={changeHandler}
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
                <tr className="">
                  <td className="bg-white" colSpan="9">
                      <button
                      className=" w-28 p-2 px-4 text-sm font-bold bg-green-200 rounded-xl m-2"
                      onClick={(e) => {
                        e.preventDefault()
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
