import React, { useEffect, useState } from 'react'
import { Axios } from '../../../../../core/http-service';
import Loader from '../../../../../components/loader/Loader';
import { DatePicker } from 'zaman';

export default function S5contractsUp({close , data , id , toast }) {
    console.log(data);

    const [isLoading , setIsLoading] = useState(false)
    const [err , setErr] = useState(false)
    const [stepFive , setStepFive] = useState({
      contracts: [
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
    // console.log(sendObject);
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
    const datechangeHandler = (e, InIndex) => {
      const day = e.value.getDate()
      const mouth = e.value.getMonth()
      const year = e.value.getFullYear()
      setStepFive(prevState => {
        const updated = prevState.contracts.map((item, index) => {
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
          contracts: updated
        };
      });
      console.log(stepFive);
    }
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
          فهرست قراردادهای شاخص شرکت (3 سال گذشته)            </p>
      </div>
      <div className=" ">
        <table className="max-w-[1000px] rounded-xl overflow-hidden">
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
                        className="border border-gray-300 rounded-xl w-20"
                        onChange={changeHandler}
                        value={stepFive.contracts[index].subject}
                        name="subject"
                        id={index}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-full"
                        onChange={changeHandler}
                        value={stepFive.contracts[index].name}
                        name="name"
                        id={index}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-full"
                        onChange={changeHandler}
                        value={stepFive.contracts[index].amount}
                        name="amount"
                        id={index}
                      />
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <div className="border text-center border-gray-300 rounded-xl overflow-hidden w-full">
                        <p className='' >{stepFive.contracts[index].start}</p>
                        <div className='opacity-0 mt-100px'>
                          <DatePicker
                            onChange={(e) => datechangeHandler(e, index ,"start")}
                            locale="fa"
                            placeholder="تاریخ را انتخاب کنید"
                            format="jYYYY/jMM/jDD"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <div className="border text-center border-gray-300 rounded-xl overflow-hidden w-full">
                          <p className='' >{stepFive.contracts[index].end}</p>
                          <div className='opacity-0 mt-100px'>
                            <DatePicker
                              onChange={(e) => datechangeHandler(e, index , "end")}
                              locale="fa"
                              placeholder="تاریخ را انتخاب کنید"
                              format="jYYYY/jMM/jDD"
                            />
                          </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-gray-600 font-bold">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-xl w-full"
                        onChange={changeHandler}
                        value={stepFive.contracts[index].progress}
                        name="progress"
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
